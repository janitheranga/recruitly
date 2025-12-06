export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type JobInsert = {
  job_title: string;
  job_description: string;
  job_status: string;
};

export type JobUpdate = {
  job_title?: string;
  job_description?: string;
  job_status?: string;
};

export interface Database {
  public: {
    Tables: {
      jobs: {
        Row: {
          job_id: number;
          job_title: string;
          job_description: string;
          job_status: string;
          created_at: string;
        };
        Insert: JobInsert;
        Update: JobUpdate;
      };
      applicants: {
        Row: {
          applicant_id: number;
          created_at: string;
          job_id: number;
          applicant_name: string;
          applicant_email: string;
          applicant_job_match: string;
          years_of_experience: string;
          notable_work_experience: string;
          notable_qualifications: string;
          application_status: string;
        };
        Insert: {
          applicant_id?: number;
          created_at?: string;
          job_id: number;
          applicant_name: string;
          applicant_email: string;
          applicant_job_match: string;
          years_of_experience: string;
          notable_work_experience: string;
          notable_qualifications: string;
          application_status: string;
        };
        Update: {
          applicant_id?: number;
          created_at?: string;
          job_id?: number;
          applicant_name?: string;
          applicant_email?: string;
          applicant_job_match?: string;
          years_of_experience?: string;
          notable_work_experience?: string;
          notable_qualifications?: string;
          application_status?: string;
        };
      };
    };
  };
}
