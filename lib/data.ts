import { Job, Applicant, ApplicantData, JobMatchLevel } from "./types";

// Mock Jobs
export const mockJobs: Job[] = [
  {
    id: "JOB-001",
    title: "Senior Frontend Developer",
    description:
      "Looking for an experienced React developer with 5+ years of experience in building modern web applications.",
    status: "Active",
  },
  {
    id: "JOB-002",
    title: "Backend Engineer",
    description:
      "Node.js developer needed for building scalable microservices architecture.",
    status: "Active",
  },
  {
    id: "JOB-003",
    title: "Full Stack Developer",
    description:
      "Experience with both frontend and backend technologies. Must know React and Node.js.",
    status: "Active",
  },
  {
    id: "JOB-004",
    title: "DevOps Engineer",
    description:
      "Looking for someone experienced in AWS, Docker, and Kubernetes.",
    status: "Closed",
  },
  {
    id: "JOB-005",
    title: "UI/UX Designer",
    description:
      "Creative designer needed for designing modern and intuitive user interfaces.",
    status: "Closed",
  },
  {
    id: "JOB-006",
    title: "Data Scientist",
    description:
      "Python expert with machine learning and data analysis skills.",
    status: "Active",
  },
  {
    id: "JOB-007",
    title: "Product Manager",
    description: "Experienced PM to lead product development and strategy.",
    status: "Active",
  },
  {
    id: "JOB-008",
    title: "Mobile Developer",
    description:
      "React Native or Flutter developer for cross-platform mobile apps.",
    status: "Closed",
  },
];

// Mock Applicants
export const mockApplicants: Applicant[] = [
  {
    id: "APP-001",
    name: "John Smith",
    email: "john.smith@example.com",
    jobId: "JOB-001",
    jobMatch: "Top Performer",
    yearsOfExperience:
      "7 years in frontend development\n5 years with React\n3 years with TypeScript",
    notableQualifications:
      "Bachelor's in Computer Science\nAWS Certified Solutions Architect\nGoogle Cloud Professional",
    notableWorkExperience:
      "Lead Frontend Developer at Tech Corp (2020-2023)\nSenior Developer at StartupXYZ (2017-2020)\nFrontend Engineer at WebSolutions (2015-2017)",
    appliedDate: new Date("2024-11-20"),
  },
  {
    id: "APP-002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    jobId: "JOB-001",
    jobMatch: "Potential",
    yearsOfExperience:
      "4 years in web development\n2 years with React\n1 year with TypeScript",
    notableQualifications:
      "Master's in Software Engineering\nScrum Master Certified",
    notableWorkExperience:
      "Frontend Developer at Digital Agency (2020-2024)\nJunior Developer at WebStudio (2018-2020)",
    appliedDate: new Date("2024-11-22"),
  },
  {
    id: "APP-003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    jobId: "JOB-002",
    jobMatch: "Top Performer",
    yearsOfExperience:
      "8 years in backend development\n6 years with Node.js\n4 years with microservices",
    notableQualifications:
      "Master's in Computer Science\nKubernetes Certified Administrator\nAWS Solutions Architect",
    notableWorkExperience:
      "Principal Backend Engineer at CloudTech (2021-2024)\nSenior Backend Developer at DataSystems (2017-2021)\nBackend Engineer at AppWorks (2015-2017)",
    appliedDate: new Date("2024-11-18"),
  },
  {
    id: "APP-004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    jobId: "JOB-002",
    jobMatch: "Under Performer",
    yearsOfExperience: "2 years in backend development\n1 year with Node.js",
    notableQualifications: "Bachelor's in Information Technology",
    notableWorkExperience: "Junior Backend Developer at StartupCo (2022-2024)",
    appliedDate: new Date("2024-11-25"),
  },
  {
    id: "APP-005",
    name: "David Wilson",
    email: "david.wilson@example.com",
    jobId: "JOB-003",
    jobMatch: "Top Performer",
    yearsOfExperience:
      "6 years full stack development\n4 years with React and Node.js\n3 years with AWS",
    notableQualifications:
      "Bachelor's in Computer Engineering\nAWS Certified Developer\nMongoDB Certified",
    notableWorkExperience:
      "Full Stack Lead at TechStartup (2020-2024)\nFull Stack Developer at WebCompany (2017-2020)",
    appliedDate: new Date("2024-11-21"),
  },
  {
    id: "APP-006",
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    jobId: "JOB-003",
    jobMatch: "Potential",
    yearsOfExperience:
      "3 years full stack development\n2 years with React\n2 years with Express.js",
    notableQualifications:
      "Bachelor's in Software Engineering\nScrum Certified",
    notableWorkExperience: "Full Stack Developer at DigitalCorp (2021-2024)",
    appliedDate: new Date("2024-11-23"),
  },
  {
    id: "APP-007",
    name: "James Martinez",
    email: "james.martinez@example.com",
    jobId: "JOB-006",
    jobMatch: "Top Performer",
    yearsOfExperience:
      "5 years in data science\n4 years with Python and ML\n3 years with TensorFlow",
    notableQualifications:
      "PhD in Data Science\nTensorFlow Developer Certificate\nAWS Machine Learning Specialty",
    notableWorkExperience:
      "Senior Data Scientist at AI Labs (2021-2024)\nData Scientist at DataCorp (2018-2021)",
    appliedDate: new Date("2024-11-19"),
  },
  {
    id: "APP-008",
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    jobId: "JOB-006",
    jobMatch: "Under Performer",
    yearsOfExperience: "1 year in data analysis\n6 months with Python",
    notableQualifications: "Bachelor's in Statistics",
    notableWorkExperience: "Junior Data Analyst at Analytics Inc (2023-2024)",
    appliedDate: new Date("2024-11-24"),
  },
  {
    id: "APP-009",
    name: "Robert Thomas",
    email: "robert.thomas@example.com",
    jobId: "JOB-007",
    jobMatch: "Potential",
    yearsOfExperience:
      "4 years in product management\n2 years in agile environments",
    notableQualifications:
      "MBA from Top Business School\nCertified Scrum Product Owner\nPMP Certified",
    notableWorkExperience:
      "Product Manager at TechFirm (2022-2024)\nAssociate Product Manager at StartupHub (2020-2022)",
    appliedDate: new Date("2024-11-26"),
  },
  {
    id: "APP-010",
    name: "Amanda White",
    email: "amanda.white@example.com",
    jobId: "JOB-007",
    jobMatch: "Top Performer",
    yearsOfExperience:
      "7 years in product management\n5 years leading product teams\n3 years in SaaS",
    notableQualifications:
      "MBA in Product Management\nCertified Product Manager\nLean Six Sigma Black Belt",
    notableWorkExperience:
      "Senior Product Manager at SaaS Company (2020-2024)\nProduct Manager at Enterprise Tech (2017-2020)",
    appliedDate: new Date("2024-11-17"),
  },
  {
    id: "APP-011",
    name: "Christopher Harris",
    email: "chris.harris@example.com",
    jobId: "JOB-001",
    jobMatch: "Under Performer",
    yearsOfExperience: "1.5 years in web development\n8 months with React",
    notableQualifications: "Bootcamp Graduate\nFreeCodeCamp Certified",
    notableWorkExperience: "Junior Developer at WebAgency (2023-2024)",
    appliedDate: new Date("2024-11-27"),
  },
  {
    id: "APP-012",
    name: "Patricia Clark",
    email: "patricia.clark@example.com",
    jobId: "JOB-002",
    jobMatch: "Potential",
    yearsOfExperience:
      "3.5 years in backend development\n2 years with Node.js and Express\n1 year with PostgreSQL",
    notableQualifications:
      "Bachelor's in Computer Science\nMongoDB Certified Developer",
    notableWorkExperience:
      "Backend Developer at CloudServices (2021-2024)\nJunior Developer at APICompany (2020-2021)",
    appliedDate: new Date("2024-11-28"),
  },
];

// Generate mock applicant data for charts (last 30 days)
const generateApplicantData = (): ApplicantData[] => {
  const data: ApplicantData[] = [];
  const today = new Date();
  const activeJobs = mockJobs.filter((job) => job.status === "Active");

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    activeJobs.forEach((job) => {
      // Random applicant count between 5 and 30
      const count = Math.floor(Math.random() * 26) + 5;
      data.push({
        date,
        jobId: job.id,
        count,
      });
    });
  }

  return data;
};

export const mockApplicantData = generateApplicantData();

// Helper functions
export const getApplicantsByJobMatch = (level: JobMatchLevel): Applicant[] => {
  return mockApplicants.filter((app) => app.jobMatch === level);
};

export const getApplicantsByJobId = (jobId: string): Applicant[] => {
  return mockApplicants.filter((app) => app.jobId === jobId);
};

export const getJobById = (jobId: string): Job | undefined => {
  return mockJobs.find((job) => job.id === jobId);
};

export const getApplicantById = (
  applicantId: string
): Applicant | undefined => {
  return mockApplicants.find((app) => app.id === applicantId);
};
