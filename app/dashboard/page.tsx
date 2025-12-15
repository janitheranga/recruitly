"use client";

import { motion } from "motion/react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { generateUniqueColors } from "@/lib/colors";
import { supabase } from "@/lib/supabase";
import { Database } from "@/lib/database.types";
import { mockJobs, mockApplicants, mockApplicantData } from "@/lib/data";
import { useState, useEffect } from "react";
import { DonutChart } from "@/components/dashboard/DonutChart";
import {
  LineChartCard,
  LineSeries,
} from "@/components/dashboard/LineChartCard";

type SupabaseJob = Database["public"]["Tables"]["jobs"]["Row"];
type SupabaseApplicant = Database["public"]["Tables"]["applicants"]["Row"];

export default function DashboardPage() {
  const [supabaseJobs, setSupabaseJobs] = useState<SupabaseJob[]>([]);
  const [supabaseApplicants, setSupabaseApplicants] = useState<
    SupabaseApplicant[]
  >([]);
  const [useSupabase, setUseSupabase] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lineColors, setLineColors] = useState<string[]>([]);
  const [jobStatusDoughnutColors, setJobStatusDoughnutColors] = useState<
    string[]
  >([]);
  const [applicantDoughnutColors, setApplicantDoughnutColors] = useState<
    string[]
  >([]);

  // Load jobs from Supabase
  useEffect(() => {
    const loadJobs = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("job_id", { ascending: true });
      if (error || !data || data.length === 0) {
        setUseSupabase(false);
      } else {
        setSupabaseJobs(data);
        setUseSupabase(true);
      }
      setIsLoading(false);
    };
    loadJobs();
  }, []);

  // Load applicants from Supabase
  useEffect(() => {
    const loadApplicants = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("applicants")
        .select("*")
        .order("applicant_id", { ascending: true });
      if (error || !data || data.length === 0) {
        setUseSupabase(false);
      } else {
        setSupabaseApplicants(data);
      }
      setIsLoading(false);
    };
    loadApplicants();
  }, []);

  // Generate random colors on mount
  useEffect(() => {
    setLineColors(generateUniqueColors(5));
    setJobStatusDoughnutColors(generateUniqueColors(2));
    setApplicantDoughnutColors(generateUniqueColors(3));
  }, []);

  const jobsToUse = useSupabase ? supabaseJobs : mockJobs;
  const activeJobs = useSupabase
    ? supabaseJobs.filter((job) => job.job_status === "Active").length
    : mockJobs.filter((job) => job.status === "Active").length;
  const closedJobs = useSupabase
    ? supabaseJobs.filter((job) => job.job_status === "Closed").length
    : mockJobs.filter((job) => job.status === "Closed").length;
  const totalJobs = useSupabase ? supabaseJobs.length : mockJobs.length;

  const jobData = [
    { name: "Active", value: activeJobs, color: jobStatusDoughnutColors[0] },
    { name: "Closed", value: closedJobs, color: jobStatusDoughnutColors[1] },
  ];

  // Calculate applicant counts
  const applicantsToUse = useSupabase ? supabaseApplicants : mockApplicants;
  const topPerformers = useSupabase
    ? supabaseApplicants.filter(
        (app) => app.applicant_job_match === "Top Performer"
      ).length
    : mockApplicants.filter((app) => app.jobMatch === "Top Performer").length;
  const potential = useSupabase
    ? supabaseApplicants.filter(
        (app) => app.applicant_job_match === "Potential"
      ).length
    : mockApplicants.filter((app) => app.jobMatch === "Potential").length;
  const underPerformers = useSupabase
    ? supabaseApplicants.filter(
        (app) => app.applicant_job_match === "Under Performer"
      ).length
    : mockApplicants.filter((app) => app.jobMatch === "Under Performer").length;
  const totalApplicants = useSupabase
    ? supabaseApplicants.length
    : mockApplicants.length;

  const applicantData = [
    {
      name: "Top Performers",
      value: topPerformers,
      color: applicantDoughnutColors[0],
    },
    { name: "Potential", value: potential, color: applicantDoughnutColors[1] },
    {
      name: "Under Performers",
      value: underPerformers,
      color: applicantDoughnutColors[2],
    },
  ];

  // Prepare line chart data (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date("2025-11-24");
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const activeJobIds = useSupabase
    ? supabaseJobs
        .filter((job) => job.job_status === "Active")
        .map((job) => job.job_id.toString())
    : mockJobs.filter((job) => job.status === "Active").map((job) => job.id);

  const lineChartData = last7Days.map((date) => {
    const dayName = dayNames[date.getDay()];
    const dataPoint: any = { day: dayName };

    activeJobIds.forEach((jobId) => {
      let jobTitle = "";
      let count = 0;

      if (useSupabase) {
        const applicantsForDay = supabaseApplicants.filter((app) => {
          const appDate = new Date(app.created_at).toDateString();
          return (
            app.job_id === Number(jobId) && appDate === date.toDateString()
          );
        });
        count = applicantsForDay.length;
        const job = supabaseJobs.find((j) => j.job_id === Number(jobId));
        jobTitle = job?.job_title || "Unknown";
      } else {
        const job = mockJobs.find((j) => j.id === jobId);
        const applicantsForDay = mockApplicantData.filter(
          (data) =>
            data.jobId === jobId &&
            data.date.toDateString() === date.toDateString()
        );
        count = applicantsForDay.reduce((sum, item) => sum + item.count, 0);
        jobTitle = job?.title || "Unknown";
      }

      if (jobTitle) {
        dataPoint[jobTitle] = count;
      }
    });

    return dataPoint;
  });

  const lineSeries: LineSeries[] = (
    useSupabase
      ? supabaseJobs.filter((job) => job.job_status === "Active")
      : mockJobs.filter((job) => job.status === "Active")
  )
    .map((job, index) => {
      const title = useSupabase
        ? (job as SupabaseJob).job_title
        : (job as (typeof mockJobs)[0]).title;
      if (!title) return null;
      return {
        key: title,
        color: lineColors[index % lineColors.length],
      } satisfies LineSeries | null;
    })
    .filter(Boolean) as LineSeries[];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 "
    >
      <LoadingSpinner isOpen={isLoading} message="Loading dashboard..." />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold text-slate-900"
      >
        Dashboard
      </motion.h1>

      {/* Doughnut Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DonutChart
          title="Job Status"
          data={jobData}
          total={totalJobs}
          centerLabel="Total"
        />
        <DonutChart
          title="Applicant Distribution"
          data={applicantData}
          total={totalApplicants}
          centerLabel="Total"
        />
      </div>

      {/* Line Chart */}
      <LineChartCard
        title="Applicants Trend (Last 7 Days)"
        data={lineChartData}
        series={lineSeries}
      />
    </motion.div>
  );
}
