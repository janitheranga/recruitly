import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST() {
  try {
    // Define 5 job records to seed
    const jobsData = [
      {
        job_title: "Senior Frontend Developer",
        job_description:
          "Looking for an experienced React developer with 5+ years of experience in building modern web applications.",
        job_status: "Active",
        created_at: new Date("2024-10-01").toISOString(),
      },
      {
        job_title: "Backend Engineer",
        job_description:
          "Node.js developer needed for building scalable microservices architecture.",
        job_status: "Active",
        created_at: new Date("2024-10-05").toISOString(),
      },
      {
        job_title: "Full Stack Developer",
        job_description:
          "Experience with both frontend and backend technologies. Must know React and Node.js.",
        job_status: "Active",
        created_at: new Date("2024-10-10").toISOString(),
      },
      {
        job_title: "Data Scientist",
        job_description:
          "Python expert with machine learning and data analysis skills.",
        job_status: "Active",
        created_at: new Date("2024-10-15").toISOString(),
      },
      {
        job_title: "Product Manager",
        job_description:
          "Experienced PM to lead product development and strategy.",
        job_status: "Active",
        created_at: new Date("2024-10-20").toISOString(),
      },
    ];

    // Clear existing jobs (optional - remove if you want to keep existing data)
    const { error: deleteError } = await supabase
      .from("jobs")
      .delete()
      .neq("job_id", 0);

    if (deleteError) {
      console.error("Error clearing jobs:", deleteError);
    }

    // Insert jobs
    const { data, error } = await (supabase as any)
      .from("jobs")
      .insert(jobsData)
      .select();

    if (error) {
      console.error("Error seeding jobs:", error);
      return NextResponse.json(
        { error: "Failed to seed jobs", details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Jobs table seeded successfully",
      data,
      count: data?.length || 0,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error },
      { status: 500 }
    );
  }
}
