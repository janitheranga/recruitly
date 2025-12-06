import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Helper function to generate realistic applicant data
function generateApplicants(count: number) {
  const firstNames = [
    "Alex",
    "Taylor",
    "Jordan",
    "Morgan",
    "Casey",
    "Riley",
    "Skyler",
    "Avery",
    "Peyton",
    "Quinn",
    "Hayden",
    "Reese",
    "Sawyer",
    "Rowan",
    "Emerson",
    "Finley",
    "Dakota",
    "Harper",
    "Blake",
    "Cameron",
    "Sam",
    "Drew",
    "Jamie",
    "Charlie",
    "Parker",
    "River",
    "Phoenix",
    "Sage",
    "Kai",
    "Ashton",
    "Bailey",
    "Eden",
    "Ellis",
    "Lennon",
    "Marley",
    "Oakley",
    "Quinn",
    "Remy",
    "Stevie",
    "Winter",
  ];

  const lastNames = [
    "Lee",
    "Kim",
    "Patel",
    "Nguyen",
    "Garcia",
    "Martinez",
    "Singh",
    "Chen",
    "Wang",
    "Khan",
    "Lopez",
    "Gonzalez",
    "Perez",
    "Sanchez",
    "Ramirez",
    "Torres",
    "Flores",
    "Rivera",
    "Gomez",
    "Diaz",
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Miller",
    "Davis",
    "Rodriguez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
    "Thompson",
    "White",
    "Harris",
    "Clark",
    "Lewis",
  ];

  const jobMatches = ["Top Performer", "Potential", "Under Performer"];
  const statuses = ["Approved", "Pending Review", "Rejected"];

  const experienceTemplates = [
    (years: number) =>
      `${years} years in software development\n${Math.floor(
        years * 0.7
      )} years with modern frameworks\n${Math.floor(
        years * 0.5
      )} years in team leadership`,
    (years: number) =>
      `${years} years in full stack development\n${Math.floor(
        years * 0.6
      )} years with React and Node.js\n${Math.floor(
        years * 0.4
      )} years with cloud technologies`,
    (years: number) =>
      `${years} years in backend engineering\n${Math.floor(
        years * 0.8
      )} years with microservices\n${Math.floor(
        years * 0.5
      )} years with database optimization`,
    (years: number) =>
      `${years} years in data science\n${Math.floor(
        years * 0.7
      )} years with Python and ML\n${Math.floor(
        years * 0.4
      )} years with deep learning`,
    (years: number) =>
      `${years} years in product management\n${Math.floor(
        years * 0.6
      )} years in agile environments\n${Math.floor(
        years * 0.5
      )} years leading cross-functional teams`,
  ];

  const qualificationTemplates = [
    "Bachelor's in Computer Science\nAWS Certified Solutions Architect\nScrum Master Certified",
    "Master's in Software Engineering\nGoogle Cloud Professional\nKubernetes Certified Administrator",
    "PhD in Data Science\nTensorFlow Developer Certificate\nAWS Machine Learning Specialty",
    "Bachelor's in Information Technology\nMongoDB Certified Developer\nDocker Certified Associate",
    "MBA in Product Management\nCertified Product Manager\nLean Six Sigma Black Belt",
    "Bachelor's in Computer Engineering\nAzure Developer Associate\nJenkins Certified Engineer",
    "Master's in Artificial Intelligence\nDeep Learning Specialization\nPython Institute Certified",
    "Bachelor's in Statistics\nTableau Desktop Specialist\nGoogle Analytics Certified",
  ];

  const workExperienceTemplates = [
    (name: string, idx: number) =>
      `Senior Engineer at Tech Corp ${2020 + (idx % 4)}-${
        2021 + (idx % 4)
      }\nLead Developer at StartupXYZ ${2018 + (idx % 3)}-${
        2020 + (idx % 4)
      }\nSoftware Engineer at WebSolutions ${2016 + (idx % 3)}-${
        2018 + (idx % 3)
      }`,
    (name: string, idx: number) =>
      `Principal Developer at CloudTech ${
        2021 + (idx % 3)
      }-Present\nSenior Developer at DataSystems ${2018 + (idx % 4)}-${
        2021 + (idx % 3)
      }\nDeveloper at AppWorks ${2015 + (idx % 4)}-${2018 + (idx % 4)}`,
    (name: string, idx: number) =>
      `Engineering Manager at Enterprise Co ${
        2020 + (idx % 4)
      }-Present\nSenior Developer at Digital Agency ${2017 + (idx % 4)}-${
        2020 + (idx % 4)
      }\nFrontend Engineer at WebStudio ${2015 + (idx % 3)}-${
        2017 + (idx % 4)
      }`,
    (name: string, idx: number) =>
      `Data Scientist at AI Labs ${
        2021 + (idx % 3)
      }-Present\nData Analyst at Analytics Inc ${2019 + (idx % 3)}-${
        2021 + (idx % 3)
      }\nJunior Analyst at DataCorp ${2017 + (idx % 3)}-${2019 + (idx % 3)}`,
    (name: string, idx: number) =>
      `Product Manager at SaaS Company ${
        2020 + (idx % 4)
      }-Present\nAssociate PM at TechFirm ${2018 + (idx % 3)}-${
        2020 + (idx % 4)
      }\nBusiness Analyst at StartupHub ${2016 + (idx % 3)}-${
        2018 + (idx % 3)
      }`,
  ];

  const applicants = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName =
      lastNames[Math.floor(i / firstNames.length) % lastNames.length];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${
      i + 1
    }@example.com`;

    // Distribute applicants across 5 jobs (job_id 1-5)
    const jobId = (i % 5) + 1;

    // Create varied distribution of job matches and statuses
    const jobMatch = jobMatches[i % 3];
    const applicationStatus = statuses[i % 3];

    // Generate years of experience (1-12 years)
    const years = Math.floor(Math.random() * 12) + 1;
    const yearsOfExperience =
      experienceTemplates[i % experienceTemplates.length](years);

    const notableQualifications =
      qualificationTemplates[i % qualificationTemplates.length];
    const notableWorkExperience = workExperienceTemplates[
      i % workExperienceTemplates.length
    ](name, i);

    // Generate dates over the past 60 days
    const daysAgo = Math.floor(Math.random() * 60);
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - daysAgo);

    applicants.push({
      created_at: createdAt.toISOString(),
      job_id: jobId,
      applicant_name: name,
      applicant_email: email,
      applicant_job_match: jobMatch,
      years_of_experience: yearsOfExperience,
      notable_work_experience: notableWorkExperience,
      notable_qualifications: notableQualifications,
      application_status: applicationStatus,
    });
  }

  return applicants;
}

export async function POST() {
  try {
    // Generate 400+ applicants
    const applicantsData = generateApplicants(420);

    // Clear existing applicants (optional - remove if you want to keep existing data)
    const { error: deleteError } = await supabase
      .from("applicants")
      .delete()
      .neq("applicant_id", 0);

    if (deleteError) {
      console.error("Error clearing applicants:", deleteError);
    }

    // Supabase has a limit on bulk inserts, so we'll batch them
    const batchSize = 100;
    const batches = [];
    for (let i = 0; i < applicantsData.length; i += batchSize) {
      batches.push(applicantsData.slice(i, i + batchSize));
    }

    let totalInserted = 0;
    const results = [];

    for (const batch of batches) {
      const { data, error } = await supabase
        .from("applicants")
        .insert(batch)
        .select();

      if (error) {
        console.error("Error seeding applicants batch:", error);
        return NextResponse.json(
          { error: "Failed to seed applicants", details: error },
          { status: 500 }
        );
      }

      totalInserted += data?.length || 0;
      results.push(data);
    }

    return NextResponse.json({
      success: true,
      message: "Applicants table seeded successfully",
      count: totalInserted,
      batches: batches.length,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error },
      { status: 500 }
    );
  }
}
