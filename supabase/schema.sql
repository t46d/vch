-- ============================================
-- VeXachat Database Schema
-- ============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- PROFILES TABLE
-- ============================================
create table public.profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  name text not null,
  age integer check (age >= 18 and age <= 100),
  bio text,
  interests text[] default '{}',
  avatar_url text,
  location text,
  gender text check (gender in ('male', 'female', 'other', 'prefer_not_to_say')),
  looking_for text check (looking_for in ('dating', 'friendship', 'networking', 'consultation')),
  is_consultant boolean default false,
  consultant_rate numeric(10,2),
  consultant_specialties text[],
  verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = user_id);

-- Index for faster queries
create index profiles_user_id_idx on public.profiles(user_id);
create index profiles_looking_for_idx on public.profiles(looking_for);
create index profiles_is_consultant_idx on public.profiles(is_consultant);

-- ============================================
-- MATCHES TABLE
-- ============================================
create table public.matches (
  id uuid primary key default uuid_generate_v4(),
  user1_id uuid references public.profiles(user_id) on delete cascade not null,
  user2_id uuid references public.profiles(user_id) on delete cascade not null,
  status text check (status in ('pending', 'accepted', 'rejected', 'blocked')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user1_id, user2_id)
);

alter table public.matches enable row level security;

create policy "Users can view their own matches"
  on public.matches for select
  using (auth.uid() = user1_id or auth.uid() = user2_id);

create policy "Users can create matches"
  on public.matches for insert
  with check (auth.uid() = user1_id);

create policy "Users can update their matches"
  on public.matches for update
  using (auth.uid() = user1_id or auth.uid() = user2_id);

create index matches_user1_idx on public.matches(user1_id);
create index matches_user2_idx on public.matches(user2_id);

-- ============================================
-- CONVERSATIONS TABLE
-- ============================================
create table public.conversations (
  id uuid primary key default uuid_generate_v4(),
  participant1_id uuid references public.profiles(user_id) on delete cascade not null,
  participant2_id uuid references public.profiles(user_id) on delete cascade not null,
  is_paid boolean default false,
  session_duration integer, -- in minutes
  session_price numeric(10,2),
  session_status text check (session_status in ('active', 'completed', 'cancelled')) default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(participant1_id, participant2_id)
);

alter table public.conversations enable row level security;

create policy "Users can view their conversations"
  on public.conversations for select
  using (auth.uid() = participant1_id or auth.uid() = participant2_id);

create policy "Users can create conversations"
  on public.conversations for insert
  with check (auth.uid() = participant1_id);

create index conversations_participant1_idx on public.conversations(participant1_id);
create index conversations_participant2_idx on public.conversations(participant2_id);

-- ============================================
-- MESSAGES TABLE
-- ============================================
create table public.messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  sender_id uuid references public.profiles(user_id) on delete cascade not null,
  content text not null,
  message_type text check (message_type in ('text', 'image', 'video', 'audio', 'file')) default 'text',
  media_url text,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.messages enable row level security;

create policy "Users can view messages in their conversations"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations
      where conversations.id = messages.conversation_id
      and (conversations.participant1_id = auth.uid() or conversations.participant2_id = auth.uid())
    )
  );

create policy "Users can send messages to their conversations"
  on public.messages for insert
  with check (
    exists (
      select 1 from public.conversations
      where conversations.id = conversation_id
      and (conversations.participant1_id = auth.uid() or conversations.participant2_id = auth.uid())
    )
    and sender_id = auth.uid()
  );

create index messages_conversation_idx on public.messages(conversation_id);
create index messages_sender_idx on public.messages(sender_id);
create index messages_created_at_idx on public.messages(created_at desc);

-- ============================================
-- PAYMENTS TABLE
-- ============================================
create table public.payments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(user_id) on delete cascade not null,
  conversation_id uuid references public.conversations(id) on delete set null,
  amount numeric(10,2) not null,
  currency text default 'USD',
  payment_method text check (payment_method in ('card', 'paypal', 'stripe', 'wallet')) not null,
  status text check (status in ('pending', 'completed', 'failed', 'refunded')) default 'pending',
  stripe_payment_intent_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.payments enable row level security;

create policy "Users can view their own payments"
  on public.payments for select
  using (auth.uid() = user_id);

create index payments_user_idx on public.payments(user_id);
create index payments_status_idx on public.payments(status);

-- ============================================
-- REVIEWS TABLE
-- ============================================
create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  reviewer_id uuid references public.profiles(user_id) on delete cascade not null,
  reviewed_id uuid references public.profiles(user_id) on delete cascade not null,
  conversation_id uuid references public.conversations(id) on delete set null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(reviewer_id, reviewed_id, conversation_id)
);

alter table public.reviews enable row level security;

create policy "Reviews are viewable by everyone"
  on public.reviews for select
  using (true);

create policy "Users can create reviews"
  on public.reviews for insert
  with check (auth.uid() = reviewer_id);

create index reviews_reviewed_idx on public.reviews(reviewed_id);
create index reviews_rating_idx on public.reviews(rating);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
create table public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(user_id) on delete cascade not null,
  type text check (type in ('match', 'message', 'payment', 'review', 'system')) not null,
  title text not null,
  content text not null,
  read boolean default false,
  action_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.notifications enable row level security;

create policy "Users can view their own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "Users can update their own notifications"
  on public.notifications for update
  using (auth.uid() = user_id);

create index notifications_user_idx on public.notifications(user_id);
create index notifications_read_idx on public.notifications(read);
create index notifications_created_at_idx on public.notifications(created_at desc);

-- ============================================
-- GROUP ROOMS TABLE
-- ============================================
create table public.group_rooms (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  max_participants integer default 10,
  current_participants integer default 0,
  room_type text check (room_type in ('discovery', 'interest', 'event', 'video')) not null,
  is_active boolean default true,
  scheduled_time timestamp with time zone,
  created_by uuid references public.profiles(user_id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.group_rooms enable row level security;

create policy "Active group rooms are viewable by everyone"
  on public.group_rooms for select
  using (is_active = true);

create index group_rooms_type_idx on public.group_rooms(room_type);
create index group_rooms_active_idx on public.group_rooms(is_active);

-- ============================================
-- ROOM PARTICIPANTS TABLE
-- ============================================
create table public.room_participants (
  id uuid primary key default uuid_generate_v4(),
  room_id uuid references public.group_rooms(id) on delete cascade not null,
  user_id uuid references public.profiles(user_id) on delete cascade not null,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  left_at timestamp with time zone,
  unique(room_id, user_id)
);

alter table public.room_participants enable row level security;

create policy "Users can view room participants"
  on public.room_participants for select
  using (true);

create policy "Users can join rooms"
  on public.room_participants for insert
  with check (auth.uid() = user_id);

create index room_participants_room_idx on public.room_participants(room_id);
create index room_participants_user_idx on public.room_participants(user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger handle_matches_updated_at
  before update on public.matches
  for each row execute function public.handle_updated_at();

create trigger handle_conversations_updated_at
  before update on public.conversations
  for each row execute function public.handle_updated_at();

-- Function to create profile after signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile after signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================
-- VIEWS
-- ============================================

-- View for consultant profiles with ratings
create or replace view public.consultants_view as
select 
  p.*,
  coalesce(avg(r.rating), 0) as average_rating,
  count(r.id) as total_reviews
from public.profiles p
left join public.reviews r on p.user_id = r.reviewed_id
where p.is_consultant = true
group by p.id;

-- Grant access to views
grant select on public.consultants_view to authenticated;