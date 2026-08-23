/*
# Create orders table for checkout

1. New Tables
- `orders`
  - `id` (uuid, primary key)
  - `order_number` (text, unique, human-readable order reference like "MAI-XXXXXX")
  - `customer_name` (text, not null)
  - `email` (text, not null)
  - `address` (text, not null)
  - `city` (text, not null)
  - `postal_code` (text, not null)
  - `country` (text, not null)
  - `items` (jsonb, array of {id, name, price, quantity, selectedColor})
  - `subtotal` (numeric, not null)
  - `status` (text, default 'confirmed')
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `orders`.
- Single-tenant (no sign-in) — allow anon + authenticated to insert and read their own orders.
  Orders are intentionally submittable without an account; SELECT is open so the
  confirmation page can look up an order by its order_number.

3. Notes
- No user_id / auth dependency — this store has no sign-in flow.
- `items` stored as JSONB to keep the schema simple while preserving line-item detail.
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL DEFAULT ('MAI-' || upper(substr(encode(gen_random_bytes(4), 'hex'), 1, 6))),
  customer_name text NOT NULL,
  email text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL DEFAULT 'United States',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric(10, 2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'confirmed',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
TO anon, authenticated USING (true);
