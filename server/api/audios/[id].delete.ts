import { getAuth } from '#clerk';
import { eq, and } from 'drizzle-orm';
import { PinataSDK } from 'pinata';

export default eventHandler(async (event) => {
  const { userId } = getAuth(event);
  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const db = useDatabase();
  if (!db) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  }

  const id = getRouterParam(event, 'id');
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    });
  }

  // Fetch the generation to retrieve the fileId (not CID)
  const generation = await db
    .select()
    .from(tables.generations)
    .where(
      and(eq(tables.generations.id, id), eq(tables.generations.userId, userId)),
    )
    .limit(1);

  if (!generation || generation.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Generation Not Found',
    });
  }

  const fileId = String(generation[0].fileId); // Retrieve the file ID, not CID

  // Access the runtime config
  const config = useRuntimeConfig();

  const pinata = new PinataSDK({
    pinataJwt: config.pinataJwt, // Use the Pinata JWT from the runtime config
  });

  // Delete the file from Pinata using the fileId
  try {
    await pinata.files.delete([fileId]);
  } catch (error) {
    console.error('Error deleting from Pinata:', error.message);
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to delete audio from Pinata: ${error.message}`,
    });
  }

  // Delete the generation from the database
  const result = await db
    .delete(tables.generations)
    .where(
      and(eq(tables.generations.id, id), eq(tables.generations.userId, userId)),
    );

  if (result.affectedRows === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Generation Not Found',
    });
  }

  return {
    message: 'Generation and audio deleted successfully',
  };
});
