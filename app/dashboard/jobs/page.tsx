"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Textarea } from "@/components/ui/textarea"; // Corrected import path
import { Plus, Pencil } from "lucide-react";
import { mockJobs } from "@/lib/data";
import { Job } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { JobInsert, JobUpdate } from "@/lib/database.types";

interface SupabaseJob {
  job_id: number;
  job_title: string;
  job_description: string;
  job_status: string;
  created_at: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [supabaseJobs, setSupabaseJobs] = useState<SupabaseJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useSupabase, setUseSupabase] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | number | null>(
    null
  );
  const [editingDescription, setEditingDescription] = useState("");
  const jobsPerPage = 10;

  // Load jobs from Supabase
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .order("job_id", { ascending: true });

        if (error) {
          console.error("Error loading jobs from Supabase:", error);
          setUseSupabase(false);
        } else if (data && data.length > 0) {
          setSupabaseJobs(data);
          setUseSupabase(true);
        } else {
          setUseSupabase(false);
        }
      } catch (err) {
        console.error("Failed to load jobs:", err);
        setUseSupabase(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (useSupabase) {
      // Save to Supabase
      const insertData: Omit<SupabaseJob, "job_id" | "created_at"> = {
        job_title: jobTitle,
        job_description: jobDescription,
        job_status: "Active",
      };

      supabase
        .from("jobs")
        .insert([insertData] as any)
        .then(({ data, error }) => {
          if (error) {
            console.error("Error creating job:", error);
            alert("Failed to create job");
          } else {
            // Reload jobs from Supabase
            supabase
              .from("jobs")
              .select("*")
              .order("job_id", { ascending: true })
              .then(({ data: updatedData }) => {
                if (updatedData) {
                  setSupabaseJobs(updatedData as SupabaseJob[]);
                }
              });
            handleClear();
            setIsDialogOpen(false);
          }
        });
    } else {
      // Fallback to local state
      const newJob: Job = {
        id: `JOB-${String(jobs.length + 1).padStart(3, "0")}`,
        title: jobTitle,
        description: jobDescription,
        status: "Active",
      };

      setJobs([...jobs, newJob]);
      handleClear();
      setIsDialogOpen(false);
    }
  };

  const handleToggleStatus = (jobId: string | number) => {
    if (useSupabase) {
      // Update in Supabase
      const job = supabaseJobs.find((j) => j.job_id === jobId);
      if (job) {
        const newStatus = job.job_status === "Active" ? "Closed" : "Active";

        (supabase.from("jobs") as any)
          .update({ job_status: newStatus })
          .eq("job_id", jobId)
          .then(({ error }: any) => {
            if (error) {
              console.error("Error updating job status:", error);
              alert("Failed to update job status");
            } else {
              // Update local state
              setSupabaseJobs((prev) =>
                prev.map((j) =>
                  j.job_id === jobId ? { ...j, job_status: newStatus } : j
                )
              );
            }
          });
      }
    } else {
      // Update local state
      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId
            ? { ...job, status: job.status === "Active" ? "Closed" : "Active" }
            : job
        )
      );
    }
  };

  const handleClear = () => {
    setJobTitle("");
    setJobDescription("");
  };

  const handleEdit = (jobId: string | number, currentDescription: string) => {
    setEditingJobId(jobId);
    setEditingDescription(currentDescription);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingJobId) return;

    if (useSupabase) {
      // Update in Supabase
      (supabase.from("jobs") as any)
        .update({ job_description: editingDescription })
        .eq("job_id", editingJobId)
        .then(({ error }: any) => {
          if (error) {
            console.error("Error updating job description:", error);
            alert("Failed to update job description");
          } else {
            // Update local state
            setSupabaseJobs((prev) =>
              prev.map((j) =>
                j.job_id === editingJobId
                  ? { ...j, job_description: editingDescription }
                  : j
              )
            );
            setIsEditModalOpen(false);
            setEditingJobId(null);
            setEditingDescription("");
          }
        });
    } else {
      // Update local state
      setJobs((prev) =>
        prev.map((job) =>
          job.id === editingJobId
            ? { ...job, description: editingDescription }
            : job
        )
      );
      setIsEditModalOpen(false);
      setEditingJobId(null);
      setEditingDescription("");
    }
  };

  // Pagination logic
  const dataToDisplay = useSupabase ? supabaseJobs : jobs;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = dataToDisplay.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(dataToDisplay.length / jobsPerPage);

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Job Data</h1>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Loading jobs...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Job Data</h1>

      {/* Edit Job Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Job Description</DialogTitle>
            <DialogDescription>
              Update the job description below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Job Description</Label>
              <Textarea
                id="edit-description"
                placeholder="Enter job description..."
                value={editingDescription}
                onChange={(e) => setEditingDescription(e.target.value)}
                rows={6}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              className="bg-(--color-indigo-velvet-50) hover:bg-(--color-indigo-velvet-100) text-(--color-indigo-velvet-900) cursor-pointer"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-blue-50 hover:bg-blue-100 text-blue-900 cursor-pointer"
              onClick={handleSaveEdit}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="w-full sm:w-auto bg-(--color-honeydew-50) hover:bg-(--color-honeydew-100) text-(--color-honeydew-900) cursor-pointer border"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New Job
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create New Job</DialogTitle>
              <DialogDescription>
                Add a new job posting to track applicants.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input
                  id="job-title"
                  placeholder="e.g., Senior Frontend Developer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="job-description">Job Description</Label>
                <Textarea
                  id="job-description"
                  placeholder="Enter job requirements and responsibilities..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                type="button"
                className="bg-(--color-lilac-ash-100) hover:bg-(--color-lilac-ash-200) text-(--color-lilac-ash-900) cursor-pointer"
                onClick={handleClear}
              >
                Clear
              </Button>
              <Button
                type="button"
                className="bg-(--color-dark-amethyst-100) hover:bg-(--color-dark-amethyst-200) text-(--color-dark-amethyst-900) cursor-pointer"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-(--color-honeydew-100) hover:bg-(--color-honeydew-200) text-(--color-honeydew-900) cursor-pointer"
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job ID</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead className="hidden md:table-cell">
                  Job Description
                </TableHead>
                <TableHead>Job Status</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="text-center">Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentJobs.map((job) => {
                const isSupabaseJob = useSupabase && "job_id" in job;
                const jobId = isSupabaseJob
                  ? (job as SupabaseJob).job_id
                  : (job as Job).id;
                const jobTitle = isSupabaseJob
                  ? (job as SupabaseJob).job_title
                  : (job as Job).title;
                const jobDescription = isSupabaseJob
                  ? (job as SupabaseJob).job_description
                  : (job as Job).description;
                const jobStatus = isSupabaseJob
                  ? (job as SupabaseJob).job_status
                  : (job as Job).status;

                return (
                  <TableRow key={jobId}>
                    <TableCell className="font-medium text-sm">
                      {isSupabaseJob
                        ? `JOB-${String(jobId).padStart(3, "0")}`
                        : jobId}
                    </TableCell>
                    <TableCell className="text-sm">{jobTitle}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-md truncate text-sm">
                      {jobDescription}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          jobStatus === "Active"
                            ? "bg-green-100 text-green-800/30"
                            : "bg-red-100 text-red-800/30"
                        }`}
                      >
                        {jobStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <label className="relative inline-flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={jobStatus === "Active"}
                          onChange={() => handleToggleStatus(jobId)}
                          className="peer h-5 w-9 appearance-none rounded-full bg-red-400 transition-colors duration-200 checked:bg-green-400 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                        />
                        <span className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-4"></span>
                      </label>
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => handleEdit(jobId, jobDescription)}
                        className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-md bg-amber-50 text-amber-600 hover:text-amber-700:bg-amber-900/30 transition-colors cursor-pointer text-sm font-medium"
                        title="Edit job description"
                      >
                        <Pencil className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
