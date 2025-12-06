-- Create Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  job_id BIGSERIAL PRIMARY KEY,
  job_title TEXT NOT NULL,
  job_description TEXT NOT NULL,
  job_status TEXT NOT NULL CHECK (job_status IN ('Active', 'Closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Applicants table
CREATE TABLE IF NOT EXISTS applicants (
  applicant_id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  job_id BIGINT NOT NULL REFERENCES jobs(job_id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_job_match TEXT NOT NULL CHECK (applicant_job_match IN ('Top Performer', 'Potential', 'Under Performer')),
  years_of_experience TEXT NOT NULL,
  notable_work_experience TEXT NOT NULL,
  notable_qualifications TEXT NOT NULL,
  application_status TEXT NOT NULL CHECK (application_status IN ('Pending Review', 'Approved', 'Rejected'))
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_applicants_job_id ON applicants(job_id);
CREATE INDEX IF NOT EXISTS idx_applicants_job_match ON applicants(applicant_job_match);
CREATE INDEX IF NOT EXISTS idx_applicants_status ON applicants(application_status);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(job_status);

-- Enable Row Level Security (RLS)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
CREATE POLICY "Enable read access for all users" ON jobs FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON jobs FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON jobs FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON jobs FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON applicants FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON applicants FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON applicants FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON applicants FOR DELETE USING (true);
