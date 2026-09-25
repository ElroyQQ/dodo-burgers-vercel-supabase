-- Persistent pickup-order storage for logged-in users.
-- Run this once in the Supabase dashboard's SQL Editor (Database -> SQL Editor
-- -> New query -> paste -> Run). There is no service-role/admin access wired
-- into this app or into Claude's tooling, so this migration must be applied
-- by a human with dashboard access -- consistent with this project's
-- "no agent write access to production data" rule.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  items jsonb not null,
  total numeric not null,
  status text not null default 'preparing' check (status in ('preparing', 'ready', 'picked_up')),
  estimated_ready_at timestamptz not null,
  created_at timestamptz not null default now(),
  picked_up_at timestamptz
);

create index if not exists orders_user_id_created_at_idx
  on public.orders (user_id, created_at desc);

alter table public.orders enable row level security;

-- Each policy is scoped to auth.uid() = user_id, so a user can only ever
-- see or touch their own orders -- this is what makes it safe that the
-- browser talks to this table directly with the public anon key.
create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can create their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own orders"
  on public.orders for update
  using (auth.uid() = user_id);
