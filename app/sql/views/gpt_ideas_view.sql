CREATE OR REPLACE VIEW gpt_ideas_view AS
SELECT
  gpt_ideas.gpt_idea_id,
  gpt_ideas.title,
  gpt_ideas.views,
  gpt_ideas.created_at,
  CASE WHEN gpt_ideas.claimed_at IS NULL THEN FALSE ELSE TRUE END is_claimed,
  COUNT(gpt_idea_likes.gpt_idea_id) AS likes
FROM public.gpt_ideas
LEFT JOIN public.gpt_idea_likes USING (gpt_idea_id)
GROUP BY gpt_ideas.gpt_idea_id;

