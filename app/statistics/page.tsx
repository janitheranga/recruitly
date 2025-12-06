"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Database } from "@/lib/database.types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { mockJobs, mockApplicantData } from "@/lib/data";
import { JobStatus } from "@/lib/types";
import { startOfWeek, format, subDays, isWithinInterval } from "date-fns";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type DurationType = "30days" | "custom";

type SupabaseJob = Database["public"]["Tables"]["jobs"]["Row"];
type SupabaseApplicant = Database["public"]["Tables"]["applicants"]["Row"];

export default function StatisticsPage() {
  const [jobStatus, setJobStatus] = useState<JobStatus>("Active");
  const [durationType, setDurationType] = useState<DurationType>("30days");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);
  const [supabaseJobs, setSupabaseJobs] = useState<SupabaseJob[]>([]);
  const [supabaseApplicants, setSupabaseApplicants] = useState<
    SupabaseApplicant[]
  >([]);
  const [useSupabase, setUseSupabase] = useState(false);

  // Load jobs from Supabase
  useEffect(() => {
    const loadJobs = async () => {
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
    };
    loadJobs();
  }, []);

  // Load applicants from Supabase
  useEffect(() => {
    const loadApplicants = async () => {
      const { data, error } = await supabase
        .from("applicants")
        .select("*")
        .order("applicant_id", { ascending: true });
      if (error || !data || data.length === 0) {
        setUseSupabase(false);
      } else {
        setSupabaseApplicants(data);
      }
    };
    loadApplicants();
  }, []);
  const handleApplyCustomRange = () => {
    setDurationType("custom");
    setIsCustomDialogOpen(false);
  };

  // Calculate date range
  const getDateRange = () => {
    const today = new Date();
    if (durationType === "30days") {
      return { start: subDays(today, 29), end: today };
    } else {
      return {
        start: customStartDate ? new Date(customStartDate) : subDays(today, 29),
        end: customEndDate ? new Date(customEndDate) : today,
      };
    }
  };

  const dateRange = getDateRange();
  const daysDiff = Math.ceil(
    (dateRange.end.getTime() - dateRange.start.getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const showWeekly = daysDiff > 7;

  // Filter jobs by status
  const jobsToUse = useSupabase ? supabaseJobs : mockJobs;
  const filteredJobs = useSupabase
    ? supabaseJobs.filter((job) =>
        jobStatus === "Active"
          ? job.job_status === "Active"
          : job.job_status === "Closed"
      )
    : mockJobs.filter((job) => job.status === jobStatus);
  const filteredJobIds: (number | string)[] = useSupabase
    ? (filteredJobs as SupabaseJob[]).map((job) => job.job_id)
    : (filteredJobs as typeof mockJobs).map((job) => job.id);

  // Prepare chart data
  const chartData = useMemo(() => {
    let filteredData: any[] = [];

    if (useSupabase) {
      // Filter applicants by job_id and date range
      filteredData = supabaseApplicants
        .filter((app) => filteredJobIds.includes(app.job_id))
        .filter((app) => {
          const appDate = new Date(app.created_at);
          return isWithinInterval(appDate, {
            start: dateRange.start,
            end: dateRange.end,
          });
        })
        .map((app) => ({
          jobId: app.job_id,
          date: new Date(app.created_at),
          count: 1, // Each applicant counts as 1
        }));
    } else {
      // Use mock data
      filteredData = mockApplicantData.filter(
        (item) =>
          filteredJobIds.includes(item.jobId) &&
          isWithinInterval(item.date, {
            start: dateRange.start,
            end: dateRange.end,
          })
      );
    }

    if (showWeekly) {
      // Group by week
      const weeklyData = new Map<string, any>();

      filteredData.forEach((item) => {
        const weekStart = startOfWeek(item.date, { weekStartsOn: 0 });
        const weekKey = format(weekStart, "MMM-'week'-w");

        if (!weeklyData.has(weekKey)) {
          weeklyData.set(weekKey, { period: weekKey, weekStart });
        }

        let jobTitle = "";
        if (useSupabase) {
          const job = supabaseJobs.find((j) => j.job_id === item.jobId);
          jobTitle = job?.job_title || "Unknown";
        } else {
          const job = mockJobs.find((j) => j.id === item.jobId);
          jobTitle = job?.title || "Unknown";
        }

        if (jobTitle) {
          const current = weeklyData.get(weekKey);
          current[jobTitle] = (current[jobTitle] || 0) + item.count;
        }
      });

      return Array.from(weeklyData.values())
        .sort((a, b) => a.weekStart.getTime() - b.weekStart.getTime())
        .map(({ weekStart, ...rest }) => rest);
    } else {
      // Group by day
      const dailyData = new Map<string, any>();
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      filteredData.forEach((item) => {
        const dayKey = dayNames[item.date.getDay()];
        const dateKey = item.date.toDateString();

        if (!dailyData.has(dateKey)) {
          dailyData.set(dateKey, { period: dayKey, date: item.date });
        }

        let jobTitle = "";
        if (useSupabase) {
          const job = supabaseJobs.find((j) => j.job_id === item.jobId);
          jobTitle = job?.job_title || "Unknown";
        } else {
          const job = mockJobs.find((j) => j.id === item.jobId);
          jobTitle = job?.title || "Unknown";
        }

        if (jobTitle) {
          const current = dailyData.get(dateKey);
          current[jobTitle] = (current[jobTitle] || 0) + item.count;
        }
      });

      return Array.from(dailyData.values())
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .map(({ date, ...rest }) => rest);
    }
  }, [
    filteredJobIds,
    dateRange,
    showWeekly,
    useSupabase,
    supabaseJobs,
    supabaseApplicants,
  ]);

  // Calculate max Y value
  const maxValue = useMemo(() => {
    let max = 0;
    chartData.forEach((item) => {
      const jobs = useSupabase
        ? (filteredJobs as SupabaseJob[])
        : (filteredJobs as typeof mockJobs);
      jobs.forEach((job) => {
        const jobTitle = useSupabase
          ? (job as SupabaseJob).job_title
          : (job as (typeof mockJobs)[0]).title;
        if (item[jobTitle] && item[jobTitle] > max) {
          max = item[jobTitle];
        }
      });
    });
    return Math.ceil(max * 1.1); // Add 10% padding
  }, [chartData, filteredJobs, useSupabase]);

  const lineColors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">
        Job Applicant Statistics
      </h1>

      {/* Filters */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row flex-wrap gap-4 p-4 sm:p-6">
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <Label className="text-sm">Job Status</Label>
            <div className="flex gap-2">
              <Button
                onClick={() => setJobStatus("Active")}
                size="sm"
                className={`cursor-pointer flex-1 sm:flex-initial ${
                  jobStatus === "Active"
                    ? "bg-green-50 hover:bg-green-100 text-green-900"
                    : ""
                }`}
              >
                Active
              </Button>
              <Button
                onClick={() => setJobStatus("Closed")}
                size="sm"
                className={`cursor-pointer flex-1 sm:flex-initial ${
                  jobStatus === "Closed"
                    ? "bg-red-50 hover:bg-red-100 text-red-900"
                    : ""
                }`}
              >
                Closed
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <Label className="text-sm">Duration</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={() => setDurationType("30days")}
                size="sm"
                className={`cursor-pointer w-full sm:w-auto ${
                  durationType === "30days"
                    ? "bg-amber-50 hover:bg-amber-100 text-amber-900"
                    : ""
                }`}
              >
                Last 30 Days
              </Button>
              <Dialog
                open={isCustomDialogOpen}
                onOpenChange={setIsCustomDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className={`cursor-pointer w-full sm:w-auto ${
                      durationType === "custom"
                        ? "bg-blue-50 hover:bg-blue-100 text-blue-900"
                        : ""
                    }`}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Custom
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Custom Date Range</DialogTitle>
                    <DialogDescription>
                      Select a custom date range for the statistics.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      className="cursor-pointer bg-red-50 hover:bg-red-100 text-red-900"
                      onClick={() => setIsCustomDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleApplyCustomRange}
                      className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-900"
                    >
                      Apply
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg md:text-xl wrap-break-word">
            Applicant Trends - {jobStatus} Jobs
            {durationType === "custom" &&
              customStartDate &&
              customEndDate &&
              ` (${format(
                new Date(customStartDate),
                "MMM dd, yyyy"
              )} - ${format(new Date(customEndDate), "MMM dd, yyyy")})`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <ResponsiveContainer
            width="100%"
            height={300}
            className="sm:h-[400px] cursor-pointer"
          >
            <LineChart data={chartData} style={{ cursor: "pointer" }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="period" className="text-xs" />
              <YAxis domain={[0, maxValue]} className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.75rem",
                }}
              />
              <Legend />
              {(useSupabase
                ? (filteredJobs as SupabaseJob[])
                : (filteredJobs as typeof mockJobs)
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
    </div>
  );
}
