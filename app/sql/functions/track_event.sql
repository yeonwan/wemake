
-- Unified function to track events with automatic ID resolution
CREATE OR REPLACE FUNCTION track_event(
  event_type event_type,
  event_data jsonb
) RETURNS void AS $$
DECLARE
  resolved_profile_id uuid;
  resolved_product_id bigint;
  resolved_post_id bigint;
  resolved_data jsonb;
  identifier text;
BEGIN
  -- Handle different event types and resolve appropriate IDs
  CASE event_type
    WHEN 'profile_view' THEN
      -- Extract username from event_data
      identifier := event_data->>'username';
      IF identifier IS NOT NULL THEN
        -- Resolve username to profile_id
        SELECT profile_id INTO resolved_profile_id
        FROM profiles
        WHERE username = identifier;
        
        IF resolved_profile_id IS NOT NULL THEN
          resolved_data := jsonb_build_object('profile_id', resolved_profile_id) || (event_data - 'username');
        END IF;
      END IF;
      
    WHEN 'product_view', 'product_visit' THEN
      -- Extract product identifier from event_data
      identifier := event_data->>'product_id';
      IF identifier IS NOT NULL THEN
        -- Try as product_id (numeric)
        IF identifier ~ '^[0-9]+$' THEN
          SELECT product_id INTO resolved_product_id
          FROM products
          WHERE product_id = identifier::bigint;
          
          IF resolved_product_id IS NOT NULL THEN
            resolved_data := jsonb_build_object('product_id', resolved_product_id) || (event_data - 'product_id');
          END IF;
        ELSE
          -- If not numeric, keep as-is (could be slug or other identifier)
          resolved_data := event_data;
        END IF;
      ELSE
        -- No product_id provided, store as-is
        resolved_data := event_data;
      END IF;
      
    WHEN 'post_view', 'post_visit' THEN
      -- Extract post identifier from event_data
      identifier := event_data->>'post_id';
      IF identifier IS NOT NULL THEN
        -- Try as post_id (numeric)
        IF identifier ~ '^[0-9]+$' THEN
          SELECT post_id INTO resolved_post_id
          FROM posts
          WHERE post_id = identifier::bigint;
          
          IF resolved_post_id IS NOT NULL THEN
            resolved_data := jsonb_build_object('post_id', resolved_post_id) || (event_data - 'post_id');
          END IF;
        ELSE
          -- Keep as-is if not numeric
          resolved_data := event_data;
        END IF;
      ELSE
        -- No post_id provided, store as-is
        resolved_data := event_data;
      END IF;
      
    ELSE
      -- For unknown event types, store event_data as-is
      resolved_data := event_data;
  END CASE;
  
  -- Only insert event if we have valid data
  IF resolved_data IS NOT NULL THEN
    INSERT INTO events (event_type, event_data) 
    VALUES (event_type, resolved_data);
  END IF;
END;
$$ LANGUAGE plpgsql;