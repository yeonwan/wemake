export const JOB_TYPES = [
  {
    label: "Full-time",
    value: "full-time",
  },
  {
    label: "Part-time",
    value: "part-time",
  },
  {
    label: "Remote",
    value: "remote",
  },

] as const;

export const LOCATION_TYPES = [
  {
    label: "On-site",
    value: "on-site",
  },
  {
    label: "Remote",
    value: "remote",
  },
  {
    label: "Hybrid",
    value: "hybrid",
  },
] as const;

export const SALARY_RANGE = [
  "$0-50,000",
  "$50,000-100,000",
  "$100,000-150,000",
  "$150,000-200,000",
  "$200,000-250,000",
  "$250,000+"

] as const;