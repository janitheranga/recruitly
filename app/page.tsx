"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function HomePage() {
  const [jobChartCenter, setJobChartCenter] = useState<ChartClickType>("total");
  const [applicantChartCenter, setApplicantChartCenter] =
    useState<ApplicantChartClickType>("total");

  // Calculate job counts
  const activeJobs = mockJobs.filter((job) => job.status === "Active").length;
  const closedJobs = mockJobs.filter((job) => job.status === "Closed").length;
  const totalJobs = mockJobs.length;

  const jobData = [
    { name: "Active", value: activeJobs, color: COLORS.active },
    { name: "Closed", value: closedJobs, color: COLORS.closed },
  ];

  // Calculate applicant counts
  const topPerformers = mockApplicants.filter(
    (app) => app.jobMatch === "Top Performer"
  ).length;
  const potential = mockApplicants.filter(
    (app) => app.jobMatch === "Potential"
  ).length;
  const underPerformers = mockApplicants.filter(
    (app) => app.jobMatch === "Under Performer"
  ).length;
  const totalApplicants = mockApplicants.length;

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

  const activeJobIds = mockJobs
    .filter((job) => job.status === "Active")
    .map((job) => job.id);

  const lineChartData = last7Days.map((date) => {
    const dayName = dayNames[date.getDay()];
    const dataPoint: any = { day: dayName };

    activeJobIds.forEach((jobId) => {
      const job = mockJobs.find((j) => j.id === jobId);
      const applicantsForDay = mockApplicantData.filter(
        (data) =>
          data.jobId === jobId &&
          data.date.toDateString() === date.toDateString()
      );

      const count = applicantsForDay.reduce((sum, item) => sum + item.count, 0);
      if (job) {
        dataPoint[job.title] = count;
      }
    });

    return dataPoint;
  });

  const lineColors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

  return (
    <div className="space-y-4 sm:space-y-6">
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
            Weekly Applicant Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <ResponsiveContainer
            width="100%"
            height={300}
            className="sm:h-[400px]"
          >
            <LineChart data={lineChartData}>
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
                const job = mockJobs.find((j) => j.id === jobId);
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
              })}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
