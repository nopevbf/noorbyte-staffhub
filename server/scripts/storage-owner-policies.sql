-- Policy template untuk membatasi akses file hanya ke user pengunggah.
-- Jalankan setelah table upload/storage tersedia.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'uploaded_files'
  ) THEN
    EXECUTE 'ALTER TABLE public.uploaded_files ENABLE ROW LEVEL SECURITY';

    EXECUTE 'DROP POLICY IF EXISTS uploaded_files_select_own ON public.uploaded_files';
    EXECUTE 'DROP POLICY IF EXISTS uploaded_files_insert_own ON public.uploaded_files';
    EXECUTE 'DROP POLICY IF EXISTS uploaded_files_update_own ON public.uploaded_files';
    EXECUTE 'DROP POLICY IF EXISTS uploaded_files_delete_own ON public.uploaded_files';

    EXECUTE '
      CREATE POLICY uploaded_files_select_own
      ON public.uploaded_files
      FOR SELECT
      USING (uploader_user_id = current_setting(''app.current_user_id'', true))
    ';

    EXECUTE '
      CREATE POLICY uploaded_files_insert_own
      ON public.uploaded_files
      FOR INSERT
      WITH CHECK (uploader_user_id = current_setting(''app.current_user_id'', true))
    ';

    EXECUTE '
      CREATE POLICY uploaded_files_update_own
      ON public.uploaded_files
      FOR UPDATE
      USING (uploader_user_id = current_setting(''app.current_user_id'', true))
      WITH CHECK (uploader_user_id = current_setting(''app.current_user_id'', true))
    ';

    EXECUTE '
      CREATE POLICY uploaded_files_delete_own
      ON public.uploaded_files
      FOR DELETE
      USING (uploader_user_id = current_setting(''app.current_user_id'', true))
    ';
  END IF;
END $$;
