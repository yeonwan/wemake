/*CREATE FUNCTION update_post_upvotes() 
RETURNS trigger 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.posts SET upvotes = upvotes + 1 WHERE post_id = NEW.post_id 
  RETURN NEW;
END;
$$ 

CREATE TRIGGER post_upvotes_trigger
AFTER INSERT ON public.post_upvotes
FOR EACH ROW
EXECUTE FUNCTION public.update_post_upvotes();

CREATE FUNCTION public.update_post_unvotes() 
RETURNS trigger 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.posts SET upvotes = upvotes - 1 WHERE post_id = OLD.post_id 
  RETURN OLD;
END;
$$ 

CREATE TRIGGER post_unvotes_trigger
AFTER DELETE ON public.post_upvotes
FOR EACH ROW
EXECUTE FUNCTION public.update_post_unvotes();*/