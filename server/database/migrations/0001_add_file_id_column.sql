-- Only add `file_id` if it does not already exist in `generations`
DO
BEGIN
    IF NOT EXISTS (SELECT * FROM pragma_table_info('generations') WHERE name = 'file_id') THEN
        ALTER TABLE generations ADD COLUMN file_id TEXT;
    END IF;
END;
