-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create posts table
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  author_id UUID NOT NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  views INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read, no auth needed for read)
CREATE POLICY "Categories are viewable by everyone" 
  ON public.categories 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can create categories" 
  ON public.categories 
  FOR INSERT 
  WITH CHECK (true);

-- Posts policies (public read for published posts)
CREATE POLICY "Published posts are viewable by everyone" 
  ON public.posts 
  FOR SELECT 
  USING (published = true);

CREATE POLICY "Anyone can create posts" 
  ON public.posts 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can update posts" 
  ON public.posts 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Anyone can delete posts" 
  ON public.posts 
  FOR DELETE 
  USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default categories
INSERT INTO public.categories (name, slug) VALUES
  ('Technology', 'technology'),
  ('Design', 'design'),
  ('Business', 'business'),
  ('Lifestyle', 'lifestyle'),
  ('Development', 'development');
