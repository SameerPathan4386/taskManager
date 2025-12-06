CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE categories
ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users(id);


POLICIES:
READ cAATEGORIES--
CREATE POLICY "Can view own categories"
ON categories
FOR SELECT
USING (user_id = auth.uid());


ADD--
CREATE POLICY "Can create own categories"
ON categories
FOR INSERT
WITH CHECK (user_id = auth.uid());


Update--
CREATE POLICY "Can update own categories"
ON categories
FOR UPDATE
USING (user_id = auth.uid());


DELETE--
CREATE POLICY "Can delete own categories"
ON categories
FOR DELETE
USING (user_id = auth.uid());
