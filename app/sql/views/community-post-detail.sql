CREATE OR REPLACE VIEW community_post_detail AS
SELECT
    p.post_id,
    p.title,
    p.content,
    p.upvotes,
    p.created_at,
    t.topic_id,
    t.name as topic_name,
    t.slug as topic_slug,
    pr.name as author_name,
    pr.avatar as author_avatar,
    pr.role as author_role,
    pr.created_at as author_created_at,
    COUNT (r.reply_id) AS reply_count,
    (SELECT COUNT (*) FROM products WHERE products.profile_id = pr.profile_id) as product_count
FROM posts p
INNER JOIN topics t USING (topic_id)
LEFT JOIN post_replies r USING (post_id)
INNER JOIN profiles pr ON (p.profile_id = pr.profile_id)
GROUP BY p.post_id, t.topic_id, t.name, t.slug, pr.profile_id, pr.name, pr.avatar, pr.role, pr.created_at;
