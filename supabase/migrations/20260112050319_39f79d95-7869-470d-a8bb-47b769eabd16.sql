-- Create a storage bucket for learning materials
INSERT INTO storage.buckets (id, name, public)
VALUES ('learning-materials', 'learning-materials', true);

-- Allow authenticated users to view all files
CREATE POLICY "Anyone can view learning materials"
ON storage.objects FOR SELECT
USING (bucket_id = 'learning-materials');

-- Allow teachers and staff to upload files
CREATE POLICY "Teachers and staff can upload materials"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'learning-materials' 
  AND (
    public.has_role(auth.uid(), 'teacher'::app_role) 
    OR public.has_role(auth.uid(), 'staff'::app_role)
    OR public.has_role(auth.uid(), 'admin'::app_role)
    OR public.has_role(auth.uid(), 'superadmin'::app_role)
  )
);

-- Allow teachers and staff to update their own files
CREATE POLICY "Teachers and staff can update their materials"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'learning-materials'
  AND (
    public.has_role(auth.uid(), 'admin'::app_role)
    OR public.has_role(auth.uid(), 'superadmin'::app_role)
    OR auth.uid()::text = (storage.foldername(name))[1]
  )
);

-- Allow teachers and staff to delete their own files, admins can delete any
CREATE POLICY "Teachers and staff can delete their materials"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'learning-materials'
  AND (
    public.has_role(auth.uid(), 'admin'::app_role)
    OR public.has_role(auth.uid(), 'superadmin'::app_role)
    OR auth.uid()::text = (storage.foldername(name))[1]
  )
);