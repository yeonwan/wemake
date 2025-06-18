import type { SupabaseClient } from "@supabase/supabase-js";
import type { z } from "zod";
import type { Database } from "~/supa-client";
import type { formSchema } from "./pages/submit-job-page";
import {JOB_TYPES, LOCATION_TYPES, SALARY_RANGE} from "./constant";

export const createJob = async (client: SupabaseClient<Database>, 
  data : z.infer<typeof formSchema>) => {
  const { data: jobData, error } = await client
  .from("jobs")
  .insert({
     job_id: Math.floor(Math.random() * 1000000),
     position: data.position,
     overview: data.overview,
     responsibilities: data.responsibilities,
     qualifications: data.qualifications,
     skills: data.skills, 
     benefits: data.benefits, 
     company_name: data.companyName, 
     company_logo_url: data.companyLogoUrl, 
     company_location: data.companyLocation, 
     apply_url: data.applyUrl, 
     job_type: data.jobType as (typeof JOB_TYPES)[number]["value"], 
     location: data.location as (typeof LOCATION_TYPES)[number]["value"], 
     salary_range: data.salaryRange as (typeof SALARY_RANGE)[number]
    }).select().single();
  if (error) {
    throw error;
  }
  return jobData;
}