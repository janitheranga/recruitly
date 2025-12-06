# Supabase Setup Instructions

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Node.js and pnpm installed

## Setup Steps

### 1. Create a Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in your project details and create the project
4. Wait for the project to be provisioned

### 2. Run the SQL Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase/schema.sql`
3. Paste it into the SQL Editor and click "Run"
4. This will create the `jobs` and `applicants` tables with proper constraints and indexes

### 3. Configure Environment Variables

1. In your Supabase dashboard, go to Settings > API
2. Copy your Project URL and anon/public key
3. Create a `.env.local` file in the project root:
   ```bash
   cp .env.local.example .env.local
   ```
4. Update `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### 4. Seed the Database

Run the development server:

```bash
pnpm run dev
```

Then use the seeder endpoints:

#### Seed Jobs Table (5 rows)

```bash
curl -X POST http://localhost:3000/api/seed/jobs
```

#### Seed Applicants Table (420 rows)

```bash
curl -X POST http://localhost:3000/api/seed/applicants
```

Or visit these URLs in your browser:

- http://localhost:3000/api/seed/jobs
- http://localhost:3000/api/seed/applicants

### 5. Verify Data

1. Go to your Supabase dashboard
2. Navigate to Table Editor
3. Check the `jobs` table - should have 5 rows
4. Check the `applicants` table - should have 420 rows
5. Verify foreign key relationships are correct

## Database Schema

### Jobs Table

- `job_id` (BIGSERIAL, Primary Key) - Auto-increment
- `job_title` (TEXT, NOT NULL)
- `job_description` (TEXT, NOT NULL)
- `job_status` (TEXT, NOT NULL) - Must be 'Active' or 'Closed'
- `created_at` (TIMESTAMPTZ, NOT NULL) - Default: NOW()

### Applicants Table

- `applicant_id` (BIGSERIAL, Primary Key) - Auto-increment
- `created_at` (TIMESTAMPTZ, NOT NULL) - Default: NOW()
- `job_id` (BIGINT, NOT NULL, Foreign Key) - References jobs(job_id)
- `applicant_name` (TEXT, NOT NULL)
- `applicant_email` (TEXT, NOT NULL)
- `applicant_job_match` (TEXT, NOT NULL) - Must be 'Top Performer', 'Potential', or 'Under Performer'
- `years_of_experience` (TEXT, NOT NULL)
- `notable_work_experience` (TEXT, NOT NULL)
- `notable_qualifications` (TEXT, NOT NULL)
- `application_status` (TEXT, NOT NULL) - Must be 'Pending Review', 'Approved', or 'Rejected'

## API Endpoints

### POST /api/seed/jobs

Seeds the jobs table with 5 predefined job records.

**Response:**

```json
{
  "success": true,
  "message": "Jobs table seeded successfully",
  "data": [...],
  "count": 5
}
```

### POST /api/seed/applicants

Seeds the applicants table with 420 applicant records, properly distributed across the 5 jobs.

**Response:**

```json
{
  "success": true,
  "message": "Applicants table seeded successfully",
  "count": 420,
  "batches": 5
}
```

## Notes

- The seeder endpoints will clear existing data before inserting new records
- Foreign key constraints ensure data integrity between jobs and applicants
- Row Level Security (RLS) is enabled - adjust policies in `supabase/schema.sql` based on your security requirements
- Indexes are created for optimal query performance
