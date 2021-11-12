CREATE TABLE public.shop_items (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    price_eur integer DEFAULT 0,
    photo_url text
);
CREATE TABLE public.shopping_carts (
    user_id uuid NOT NULL,
    item_id uuid NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL
);
CREATE TABLE public.users (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text,
    email text NOT NULL,
    refresh_token text,
    created_at time without time zone DEFAULT now() NOT NULL,
    role text DEFAULT 'user'::text NOT NULL
);
ALTER TABLE ONLY public.shop_items
    ADD CONSTRAINT shop_items_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.shopping_carts
    ADD CONSTRAINT shopping_carts_id_key UNIQUE (id);
ALTER TABLE ONLY public.shopping_carts
    ADD CONSTRAINT shopping_carts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.shopping_carts
    ADD CONSTRAINT shopping_carts_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.shop_items(id);
ALTER TABLE ONLY public.shopping_carts
    ADD CONSTRAINT shopping_carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
