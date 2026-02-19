-- 1. Create Profiles Table (Public User Data)
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  username text,
  avatar_url text,
  points integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- 2. Create Deals Table
create table public.deals (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  price numeric,
  original_price numeric,
  image_url text,
  author_id uuid references public.profiles(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  votes_count integer default 0,
  comments_count integer default 0
);

-- 3. Create Votes Table (To track who voted on what)
create table public.votes (
  user_id uuid references public.profiles(id) not null,
  deal_id uuid references public.deals(id) not null,
  value integer default 1, -- 1 for upvote, -1 for downvote
  primary key (user_id, deal_id)
);

-- 4. Enable RLS (Security)
alter table public.profiles enable row level security;
alter table public.deals enable row level security;
alter table public.votes enable row level security;

-- 5. Create Policies (Who can do what)
-- Profiles: Everyone can read, User can update own
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Deals: Everyone can read, Auth users can insert
create policy "Deals are public." on public.deals for select using (true);
create policy "Users can create deals." on public.deals for insert with check (auth.uid() = author_id);

-- Votes: Public read, Auth create
create policy "Votes are public." on public.votes for select using (true);
create policy "Users can vote." on public.votes for insert with check (auth.uid() = user_id);

-- 6. Trigger to automatically create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, username)
  values (new.id, new.email, split_part(new.email, '@', 1));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 7. Insert Dummy Data (Optional)
-- This won't work easily via SQL Editor because of the auth.users constraint, 
-- but users can sign up manually to test.
