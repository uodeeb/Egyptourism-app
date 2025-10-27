/*
  # Create Venues Cache Table

  ## Purpose
  Store cached venue information from Foursquare API to reduce API calls and improve performance.

  ## Tables Created
  
  ### `venues`
  Stores venue information retrieved from the Foursquare API including:
  - `id` (uuid, primary key) - Unique identifier for the database record
  - `venue_id` (text, unique) - Foursquare venue ID
  - `name` (text) - Venue name
  - `city` (text) - City where venue is located
  - `category` (text) - Venue category (restaurant, cafe, etc.)
  - `latitude` (numeric) - Geographic latitude
  - `longitude` (numeric) - Geographic longitude
  - `address` (text) - Formatted street address
  - `distance` (numeric) - Distance from search origin in meters
  - `photo_url` (text) - URL to venue photo if available
  - `search_query` (text) - Original search query that returned this venue
  - `created_at` (timestamptz) - When the record was created
  - `updated_at` (timestamptz) - When the record was last updated

  ## Security
  - Enable RLS on the venues table
  - Allow public read access since this is a tourism app with public information
  - No write access needed from client side (data comes from API)

  ## Important Notes
  1. This table acts as a cache to reduce API calls to Foursquare
  2. Data is public tourism information, so RLS allows reading by anyone
  3. Indexes are added on commonly queried fields for performance
*/

CREATE TABLE IF NOT EXISTS venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id text UNIQUE NOT NULL,
  name text NOT NULL,
  city text,
  category text,
  latitude numeric,
  longitude numeric,
  address text,
  distance numeric,
  photo_url text,
  search_query text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE venues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to venues"
  ON venues
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_venues_city ON venues(city);
CREATE INDEX IF NOT EXISTS idx_venues_search_query ON venues(search_query);
CREATE INDEX IF NOT EXISTS idx_venues_created_at ON venues(created_at DESC);
