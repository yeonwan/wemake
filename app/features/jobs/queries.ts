import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const getJobs = async (client: SupabaseClient<Database>,
  {
    limit,
    type,
    location,
    salary
  }:
    {
      limit: number,
      type?: string,
      location?: string
      salary?: string
  }) => {
  const baseQuery = client
    .from("jobs")
    .select(
      `job_id,
      position,
      overview,
      company_name,
      company_logo_url,
      company_location,
      job_type,
      location,
      salary_range,
      created_at
      `
    )
    .limit(limit);
  if (type) {
    baseQuery.eq("job_type", type as "full-time" | "part-time" | "remote");
  }
  if (location) {
    baseQuery.eq("location", location as "remote" | "on-site" | "hybrid");
  }
  if (salary) {
    baseQuery.eq("salary_range", salary as "$0-50,000" | "$50,000-100,000" | "$100,000-150,000" | "$150,000-200,000" | "$200,000-250,000" | "$250,000+");
  }
  const { data, error } = await baseQuery;
  if (error) throw new Error(error.message);
  return data;
}

export const getJobById = async (client: SupabaseClient<Database>, { jobId }: { jobId: number }) => {
  const { data, error } = await client
    .from("jobs")
    .select("*")
    .eq("job_id", jobId)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

