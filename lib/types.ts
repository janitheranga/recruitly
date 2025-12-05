export type JobStatus = "Active" | "Closed";

export type JobMatchLevel = "Top Performer" | "Potential" | "Under Performer";

export interface Job {
  id: string;
  title: string;
  description: string;
  status: JobStatus;
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  jobId: string;
  jobMatch: JobMatchLevel;
  yearsOfExperience: string;
  notableQualifications: string;
  notableWorkExperience: string;
  appliedDate: Date;
}

export interface ApplicantData {
  date: Date;
  jobId: string;
  count: number;
}
