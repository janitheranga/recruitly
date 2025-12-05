export type JobStatus = "Active" | "Closed";

export type JobMatchLevel = "Top Performer" | "Potential" | "Under Performer";

export type ApplicationStatus = "Pending Review" | "Approved" | "Rejected";

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
  applicationStatus: ApplicationStatus;
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
