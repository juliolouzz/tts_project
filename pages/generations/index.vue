<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
});

const { loading, generations, isEmpty } = useGenerations();
const { loadings, download, fetchAudioSignedUrl } = useAudioSignedUrl();

const handleDownload = async ({
  title,
  audioId,
}: Pick<Generation, 'title' | 'audioId'>) => {
  await fetchAudioSignedUrl(audioId);
  download(title);
};

const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this generation?')) {
    return;
  }

  try {
    // Make the DELETE request to the correct API route
    await $fetch(`/api/audios/${id}`, {
      method: 'DELETE',
    });

    // Remove the deleted generation from the list
    generations.value = generations.value.filter((g) => g.id !== id);
    alert('Generation deleted successfully');
  } catch (error) {
    console.error('Failed to delete generation:', error);
    alert('Error deleting generation');
  }
};
</script>

<template>
  <div class="w-full h-full flex flex-col items-center gap-10 p-5 pb-32">
    <Onboarding
      title="Hello, your generations will appear here!"
      guide="You can generate a new one using the button at the top of the page."
      class="w-full max-w-4xl"
    />

    <div v-if="loading" class="w-full max-w-4xl flex flex-col gap-2">
      <Skeleton v-for="n in 5" :key="n" height="50px" />
    </div>

    <div v-if="isEmpty && !loading" class="w-full max-w-4xl flex gap-2">
      <Card class="w-full h-32 flex justify-center items-center">
        <template #content>
          <p class="text-base text-gray-700">
            <i class="pi pi-exclamation-triangle" />
            No generation found.
          </p>
        </template>
      </Card>
    </div>

    <div
      v-if="!isEmpty && !loading"
      class="w-full max-w-4xl flex flex-col gap-2"
    >
      <p class="text-base text-gray-700">
        {{ generations.length }} audios found.
      </p>
      <Generation
        v-for="generation in generations"
        :key="generation.id"
        :title="generation.title"
        :content="generation.content"
        :audio-id="generation.audioId"
        :date="generation.createdAt"
        :is-downloading="loadings[generation.audioId]"
        @download="handleDownload"
        @delete="handleDelete(generation.id)"
      />
    </div>
  </div>
</template>
