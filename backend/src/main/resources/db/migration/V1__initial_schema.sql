CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,
  slug VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  description VARCHAR(500) NOT NULL,
  detailed_description TEXT,
  availability_status VARCHAR(20) NOT NULL DEFAULT 'IN_STOCK' CHECK (availability_status IN ('IN_STOCK', 'OUT_OF_STOCK')),
  stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  characteristics JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pet_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pets_name ON pets(LOWER(name));
CREATE INDEX idx_pets_category_id ON pets(category_id);
CREATE INDEX idx_pets_availability_status ON pets(availability_status);
CREATE INDEX idx_pet_images_pet_id ON pet_images(pet_id);
CREATE INDEX idx_pet_images_sort_order ON pet_images(pet_id, sort_order);

INSERT INTO categories (name, slug, description) VALUES
  ('Cats', 'cats', 'Cats available for loving homes'),
  ('Dogs', 'dogs', 'Friendly dogs ready to join families'),
  ('Fish', 'fish', 'Colorful freshwater and saltwater fish'),
  ('Birds', 'birds', 'Pet birds with personality');

INSERT INTO pets (name, category_id, price, description, detailed_description, availability_status, stock_quantity, characteristics)
VALUES
  ('Fluffy', (SELECT id FROM categories WHERE slug = 'cats'), 49.99, 'Orange tabby cat, 2 years old', 'Fluffy is a playful orange tabby who loves sunny windows.', 'IN_STOCK', 5, '{"breed":"Tabby","age":"2 years","color":"Orange","size":"Small"}'),
  ('Max', (SELECT id FROM categories WHERE slug = 'dogs'), 129.99, 'Golden retriever puppy, 1 year old', 'Max is gentle, energetic, and perfect for families.', 'IN_STOCK', 3, '{"breed":"Golden Retriever","age":"1 year","size":"Large","temperament":"Friendly"}'),
  ('Goldie', (SELECT id FROM categories WHERE slug = 'fish'), 19.99, 'Goldfish, 3 inches', 'Goldie is a bright goldfish that enjoys peaceful aquarium life.', 'IN_STOCK', 12, '{"species":"Goldfish","size":"3 inches","tankSize":"20 gallon minimum","waterType":"Freshwater"}'),
  ('Kiwi', (SELECT id FROM categories WHERE slug = 'birds'), 69.99, 'Parrot with bright feathers', 'Kiwi is a curious parrot that loves to mimic gentle sounds.', 'IN_STOCK', 4, '{"species":"Parrot","wingspan":"12 inches","color":"Green & yellow","lifespan":"50+ years"}');

INSERT INTO pet_images (pet_id, url, alt_text, sort_order)
VALUES
  ((SELECT id FROM pets WHERE name = 'Fluffy'), 'https://placekitten.com/400/300', 'Fluffy the orange cat', 1),
  ((SELECT id FROM pets WHERE name = 'Max'), 'https://placedog.net/500/300', 'Max the golden retriever', 1),
  ((SELECT id FROM pets WHERE name = 'Goldie'), 'https://placefish.com/400/300', 'Goldie the goldfish', 1),
  ((SELECT id FROM pets WHERE name = 'Kiwi'), 'https://placebird.com/400/300', 'Kiwi the parrot', 1);
