CREATE OR REPLACE VIEW product_overview_view AS
SELECT
    p.product_id,
    p.name,
    p.tagline,
    p.description,
    p.icon,
    p.how_it_works,
    p.url,
    p.stats ->> 'upvotes' as upvotes,
    p.stats ->> 'views' as views,
    p.stats ->> 'reviews' as reviews,
    AVG(r.rating ) as average_rating
FROM products p
LEFT JOIN product_reviews AS r USING (product_id)
GROUP BY p.product_id;