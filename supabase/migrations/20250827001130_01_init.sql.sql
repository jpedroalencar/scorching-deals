-- Profiles mirror of auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Stores, Categories, and Deal Statuses
create table if not exists public.stores (
  id bigserial primary key,
  name text not null,
  slug text unique not null,
  domain text,
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id bigserial primary key,
  name text not null,
  slug text unique not null,
  parent_id bigint references public.categories(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.deal_statuses (
  id serial primary key,
  status_name text unique not null -- e.g., 'active', 'expired', 'reported'
);

-- Seed the initial statuses
insert into public.deal_statuses(status_name)
values ('active'), ('expired'), ('reported')
on conflict (status_name) do nothing;

-- Deals (MVP)
create table if not exists public.deals (
  id bigserial primary key,
  title text not null,
  url text not null,
  price numeric(12,2),
  original_price numeric(12,2),
  store_id bigint references public.stores(id) on delete set null,
  category_id bigint references public.categories(id) on delete set null,
  status_id int not null default 1 references public.deal_statuses(id),
  tags text[],
  author_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Dedupe helper & FTS
create extension if not exists pgcrypto;
alter table public.deals add column if not exists url_hash text;
create index if not exists deals_url_hash_idx on public.deals (url_hash);

create extension if not exists pg_trgm;
alter table public.deals add column if not exists search_tsv tsvector;
create index if not exists deals_tsv_idx on public.deals using gin (search_tsv);

-- RLS
alter table public.profiles enable row level security;
alter table public.deals enable row level security;
alter table public.stores enable row level security;
alter table public.categories enable row level security;
alter table public.deal_statuses enable row level security;

create policy "public read all" on public.profiles for select using (true);
create policy "public read all" on public.stores for select using (true);
create policy "public read all" on public.categories for select using (true);
create policy "public read all" on public.deals for select using (true);
create policy "public read all" on public.deal_statuses for select using (true);

create policy "auth can insert profiles" on public.profiles
  for insert with check (auth.uid() = id);

create policy "auth can insert deals" on public.deals
  for insert with check (auth.uid() = author_id);
  
create policy "users can update their own profiles" on public.profiles
  for update using (auth.uid() = id);

-- Trigger to automatically handle updated_at timestamps
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := timezone('utc', now());
  return new;
end;
$$;

-- Trigger to compute FTS and url_hash
create or replace function public.deals_tsvector_trigger()
returns trigger language plpgsql as $$
begin
  new.search_tsv :=
    setweight(to_tsvector('english', coalesce(new.title,'')), 'A') ||
    setweight(to_tsvector('english', array_to_string(coalesce(new.tags,'{}'::text[]), ' ')), 'B');
  if new.url is not null then
    new.url_hash := encode(digest(lower(new.url), 'sha1'), 'hex');
  end if;
  return new;
end$$;

-- Attach triggers to tables
drop trigger if exists on_profiles_updated on public.profiles;
create trigger on_profiles_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

drop trigger if exists on_deals_updated on public.deals;
create trigger on_deals_updated
  before update on public.deals
  for each row execute procedure public.handle_updated_at();

drop trigger if exists deals_tsvector_update on public.deals;
create trigger deals_tsvector_update
  before insert or update on public.deals
  for each row execute function public.deals_tsvector_trigger();

-- Documentation
comment on table public.deals is 'Stores all user-submitted deals and promotions.';
comment on column public.deals.price is 'The discounted price of the item, in CAD.';
comment on column public.deals.url_hash is 'SHA1 hash of the lowercase URL for fast deduplication.';
comment on column public.deals.search_tsv is 'Pre-computed tsvector for full-text search on title and tags.';
comment on table public.profiles is 'Stores public user data, mirroring the auth.users table.';