"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { generateUniqueColors } from "@/lib/colors";
import { supabase } from "@/lib/supabase";
import { Database } from "@/lib/database.types";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { mockJobs, mockApplicants, mockApplicantData } from "@/lib/data";
import { useState, useEffect } from "react";

type ChartClickType = "total" | "active" | "closed";
type ApplicantChartClickType = "total" | "top" | "potential" | "under";

type SupabaseJob = Database["public"]["Tables"]["jobs"]["Row"];
type SupabaseApplicant = Database["public"]["Tables"]["applicants"]["Row"];

export default function DashboardPage() {
  const [jobChartCenter, setJobChartCenter] = useState<ChartClickType>("total");
  const [applicantChartCenter, setApplicantChartCenter] =
    useState<ApplicantChartClickType>("total");
  const [supabaseJobs, setSupabaseJobs] = useState<SupabaseJob[]>([]);
  const [supabaseApplicants, setSupabaseApplicants] = useState<
    SupabaseApplicant[]
  >([]);
  const [useSupabase, setUseSupabase] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lineColors, setLineColors] = useState<string[]>([]);
  const [jobStatusDoughnutColors, setJobStatusDoughnutColors] = useState<string[]>([]);
  const [applicantDoughnutColors, setApplicantDoughnutColors] = useState<string[]>([]);

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

  const getJobCenterText = () => {
    switch (jobChartCenter) {
      case "active":
        return activeJobs;
      case "closed":
        return closedJobs;
      default:
        return totalJobs;
    }
  };

  const getApplicantCenterText = () => {
    switch (applicantChartCenter) {
      case "top":
        return topPerformers;
      case "potential":
        return potential;
      case "under":
        return underPerformers;
      default:
        return totalApplicants;
    }
  };

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
        {/* Job Count Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -5 }}
        >
          <Card className="bg-transparent cursor-pointer">
            <CardHeader>
              <CardTitle>Job Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={jobData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    dataKey="value"
                    onClick={(_, index) => {
                      if (index === 0) setJobChartCenter("active");
                      else if (index === 1) setJobChartCenter("closed");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {jobData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-2xl font-bold"
                    onClick={() => setJobChartCenter("total")}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {getJobCenterText()}
                    <span className="text-(--color-honeydew-500) text-sm block font-normal">
                      Total
                    </span>
                  </text>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {jobData.map((entry, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span>
                      {entry.name}: {entry.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Applicant Count Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -5 }}
        >
          <Card className="bg-transparent cursor-pointer">
            <CardHeader>
              <CardTitle>Applicant Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={applicantData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    dataKey="value"
                    onClick={(_, index) => {
                      if (index === 0) setApplicantChartCenter("top");
                      else if (index === 1)
                        setApplicantChartCenter("potential");
                      else if (index === 2) setApplicantChartCenter("under");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {applicantData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-2xl font-bold"
                    onClick={() => setApplicantChartCenter("total")}
                    style={{
                      cursor: "pointer",
                      fill: "var(--color-foreground)",
                    }}
                  >
                    {getApplicantCenterText()}
                  </text>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {applicantData.map((entry, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span>
                      {entry.name}: {entry.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ y: -5 }}
      >
        <Card className="bg-transparent cursor-pointer">
          <CardHeader>
            <CardTitle>Applicants Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData} style={{ cursor: "pointer" }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-slate-200"
                />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-honeydew-50)",
                    border: "1px solid var(--color-honeydew-300)",
                    borderRadius: "0.75rem",
                  }}
                />
                <Legend />
                {(useSupabase
                  ? supabaseJobs.filter((j) => j.job_status === "Active")
                  : mockJobs.filter((j) => j.status === "Active")
                ).map((job, index) => {
                  const jobTitle = useSupabase
                    ? (job as SupabaseJob).job_title
                    : (job as (typeof mockJobs)[0]).title;
                  const jobKey = useSupabase
                    ? (job as SupabaseJob).job_id
                    : (job as (typeof mockJobs)[0]).id;
                  return (
                    <Line
                      key={jobKey}
                      type="monotone"
                      dataKey={jobTitle}
                      stroke={lineColors[index % lineColors.length]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
