CREATE OR REPLACE VIEW community_post_list_view AS
SELECT
  p.post_id,
  p.title,
  p.created_at,
  t.name as topic,
  pr.name as author,
  pr.avatar as author_avatar,
  pr.username as author_username,
  p.upvotes as upvotes,
  t.slug as topic_slug
FROM posts p
INNER JOIN topics t USING (topic_id)
INNER JOIN profiles pr USING (profile_id)
