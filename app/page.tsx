"use client";

import { useState, useEffect } from "react";
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

type ChartClickType = "total" | "active" | "closed";
type ApplicantChartClickType = "total" | "top" | "potential" | "under";

const COLORS = {
  active: "#22c55e",
  closed: "#ef4444",
  topPerformer: "#22c55e",
  potential: "#eab308",
  underPerformer: "#ef4444",
};

type SupabaseJob = Database["public"]["Tables"]["jobs"]["Row"];
type SupabaseApplicant = Database["public"]["Tables"]["applicants"]["Row"];

export default function HomePage() {
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
    { name: "Active", value: activeJobs, color: COLORS.active },
    { name: "Closed", value: closedJobs, color: COLORS.closed },
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
      color: COLORS.topPerformer,
    },
    { name: "Potential", value: potential, color: COLORS.potential },
    {
      name: "Under Performers",
      value: underPerformers,
      color: COLORS.underPerformer,
    },
  ];

  // Get job center text
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

  // Get applicant center text
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
    const date = new Date();
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
        // Get applicants created on this date for this job
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
        // Use mock data
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
    <div className="space-y-4 sm:space-y-6">
      <LoadingSpinner isOpen={isLoading} message="Loading dashboard..." />
      <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>

      {/* Doughnut Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Job Count Chart */}
        <Card className="bg-transparent">
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
                  style={{ cursor: "pointer", outline: "none" }}
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
                  className="text-4xl font-bold"
                  onClick={() => setJobChartCenter("total")}
                  style={{
                    cursor: "pointer",
                    fill: "var(--color-foreground)",
                    outline: "none",
                  }}
                >
                  {getJobCenterText()}
                </text>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4">
              {jobData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm">
                    {entry.name}: {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Applicant Count Chart */}
        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle>Applicant Performance</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ResponsiveContainer
              width="100%"
              height={250}
              className="sm:h-[300px]"
            >
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
                    else if (index === 1) setApplicantChartCenter("potential");
                    else if (index === 2) setApplicantChartCenter("under");
                  }}
                  style={{ cursor: "pointer", outline: "none" }}
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
                  className="text-4xl font-bold"
                  onClick={() => setApplicantChartCenter("total")}
                  style={{
                    cursor: "pointer",
                    fill: "var(--color-foreground)",
                    outline: "none",
                  }}
                >
                  {getApplicantCenterText()}
                </text>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 mt-4">
              {applicantData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm">
                    {entry.name}: {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Line Chart */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">
            Weekly Applicant Trends - Active Jobs
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <ResponsiveContainer
            width="100%"
            height={300}
            className="sm:h-[400px] cursor-pointer"
          >
            <LineChart data={lineChartData} style={{ cursor: "pointer" }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="day" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.75rem",
                }}
              />
              <Legend />
              {activeJobIds.map((jobId, index) => {
                let job: any;
                if (useSupabase) {
                  job = supabaseJobs.find((j) => j.job_id === Number(jobId));
                  return job ? (
                    <Line
                      key={jobId}
                      type="monotone"
                      dataKey={job.job_title}
                      stroke={lineColors[index % lineColors.length]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  ) : null;
                } else {
                  job = mockJobs.find((j) => j.id === jobId);
                  return job ? (
                    <Line
                      key={jobId}
                      type="monotone"
                      dataKey={job.title}
                      stroke={lineColors[index % lineColors.length]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  ) : null;
                }
              })}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
