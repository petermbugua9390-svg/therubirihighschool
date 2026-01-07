-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('student', 'alumni', 'teacher', 'staff', 'non_teaching_staff');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    admission_number TEXT, -- For students
    year_of_graduation TEXT, -- For alumni
    department TEXT, -- For teachers/staff
    position TEXT, -- Job title/position
    bio TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create learning materials table for students
CREATE TABLE public.learning_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT,
    file_type TEXT,
    subject TEXT,
    class_level TEXT,
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on learning_materials
ALTER TABLE public.learning_materials ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own role during registration"
ON public.user_roles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for learning_materials (students and teachers can view)
CREATE POLICY "Authenticated users can view learning materials"
ON public.learning_materials
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Teachers and staff can insert materials"
ON public.learning_materials
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'teacher') OR 
  public.has_role(auth.uid(), 'staff')
);

CREATE POLICY "Teachers and staff can update their materials"
ON public.learning_materials
FOR UPDATE
TO authenticated
USING (uploaded_by = auth.uid());

CREATE POLICY "Teachers and staff can delete their materials"
ON public.learning_materials
FOR DELETE
TO authenticated
USING (uploaded_by = auth.uid());

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_learning_materials_updated_at
BEFORE UPDATE ON public.learning_materials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();