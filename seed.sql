-- Insert "RTX 4080 Super"
INSERT INTO public.deals (title, description, price, original_price, author_id, created_at, comments_count)
SELECT 
  'RTX 4080 Super - Founders Edition', 
  'Best price seen this year. Available at NVIDIA store.', 
  '999', 
  '1199', 
  id, 
  now(),
  12
FROM auth.users LIMIT 1;

-- Insert "Starfield"
INSERT INTO public.deals (title, description, price, original_price, author_id, created_at, comments_count)
SELECT 
  'Starfield: Premium Edition (PC/Xbox)', 
  'Global Steam Key on sale for the next 24 hours.', 
  '45', 
  '99', 
  id, 
  now(),
  89
FROM auth.users LIMIT 1;
