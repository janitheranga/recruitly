"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

export default function StatisticsPage() {
  const [jobStatus, setJobStatus] = useState<JobStatus>("Active");
  const [durationType, setDurationType] = useState<DurationType>("30days");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);

  // Apply custom date range
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
  const filteredJobs = mockJobs.filter((job) => job.status === jobStatus);
  const filteredJobIds = filteredJobs.map((job) => job.id);

  // Prepare chart data
  const chartData = useMemo(() => {
    const filteredData = mockApplicantData.filter(
      (item) =>
        filteredJobIds.includes(item.jobId) &&
        isWithinInterval(item.date, {
          start: dateRange.start,
          end: dateRange.end,
        })
    );

    if (showWeekly) {
      // Group by week
      const weeklyData = new Map<string, any>();

      filteredData.forEach((item) => {
        const weekStart = startOfWeek(item.date, { weekStartsOn: 0 });
        const weekKey = format(weekStart, "MMM-'week'-w");

        if (!weeklyData.has(weekKey)) {
          weeklyData.set(weekKey, { period: weekKey, weekStart });
        }

        const job = mockJobs.find((j) => j.id === item.jobId);
        if (job) {
          const current = weeklyData.get(weekKey);
          current[job.title] = (current[job.title] || 0) + item.count;
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

        const job = mockJobs.find((j) => j.id === item.jobId);
        if (job) {
          const current = dailyData.get(dateKey);
          current[job.title] = (current[job.title] || 0) + item.count;
        }
      });

      return Array.from(dailyData.values())
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .map(({ date, ...rest }) => rest);
    }
  }, [filteredJobIds, dateRange, showWeekly]);

  // Calculate max Y value
  const maxValue = useMemo(() => {
    let max = 0;
    chartData.forEach((item) => {
      filteredJobs.forEach((job) => {
        if (item[job.title] && item[job.title] > max) {
          max = item[job.title];
        }
      });
    });
    return Math.ceil(max * 1.1); // Add 10% padding
  }, [chartData, filteredJobs]);

  const lineColors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Job Applicant Statistics</h1>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-2">
            <Label>Job Status</Label>
            <div className="flex gap-2">
              <Button
                variant={jobStatus === "Active" ? "default" : "outline"}
                onClick={() => setJobStatus("Active")}
              >
                Active
              </Button>
              <Button
                variant={jobStatus === "Closed" ? "default" : "outline"}
                onClick={() => setJobStatus("Closed")}
              >
                Closed
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Duration</Label>
            <div className="flex gap-2">
              <Button
                variant={durationType === "30days" ? "default" : "outline"}
                onClick={() => setDurationType("30days")}
              >
                Last 30 Days
              </Button>
              <Dialog
                open={isCustomDialogOpen}
                onOpenChange={setIsCustomDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant={durationType === "custom" ? "default" : "outline"}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Custom Duration
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
                      variant="outline"
                      onClick={() => setIsCustomDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleApplyCustomRange}>Apply</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>
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
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
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
              {filteredJobs.map((job, index) => (
                <Line
                  key={job.id}
                  type="monotone"
                  dataKey={job.title}
                  stroke={lineColors[index % lineColors.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
