"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, X } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Database } from "@/lib/database.types";
import { mockApplicants, mockJobs } from "@/lib/data";

type SupabaseApplicant = Database["public"]["Tables"]["applicants"]["Row"];
type SupabaseJob = Database["public"]["Tables"]["jobs"]["Row"];

export default function ApplicantDetailPage() {
  const params = useParams();
  const applicantId = params.id as string;
  const [applicant, setApplicant] = useState<SupabaseApplicant | null>(null);
  const [job, setJob] = useState<SupabaseJob | null>(null);
  const [useSupabase, setUseSupabase] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<string>("Pending Review");

  useEffect(() => {
    const loadApplicant = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("applicants")
        .select("*")
        .eq("applicant_id", Number(applicantId))
        .single();
      if (error || !data) {
        // fallback to mock data
        const fallback = mockApplicants.find(
          (a) => String(a.id) === String(applicantId)
        );
        if (fallback) {
          setApplicant({
            applicant_id: Number(fallback.id),
            created_at: "",
            job_id: Number(fallback.jobId),
            applicant_name: fallback.name,
            applicant_email: fallback.email,
            applicant_job_match: fallback.jobMatch,
            years_of_experience: fallback.yearsOfExperience,
            notable_work_experience: fallback.notableWorkExperience,
            notable_qualifications: fallback.notableQualifications,
            application_status: fallback.applicationStatus,
          });
          setUseSupabase(false);
        } else {
          setApplicant(null);
        }
      } else {
        setApplicant(data as SupabaseApplicant);
        setStatus((data as SupabaseApplicant).application_status);
        setUseSupabase(true);
      }
      setIsLoading(false);
    };
    loadApplicant();
  }, [applicantId]);

  useEffect(() => {
    if (applicant && applicant.job_id) {
      const loadJob = async () => {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("job_id", applicant.job_id)
          .single();
        if (error || !data) {
          // fallback to mock data
          const fallback = mockJobs.find(
            (j) => String(j.id) === String(applicant.job_id)
          );
          if (fallback) {
            setJob({
              job_id: Number(fallback.id),
              job_title: fallback.title,
              job_description: fallback.description,
              job_status: fallback.status,
              created_at: "",
            });
          } else {
            setJob(null);
          }
        } else {
          setJob(data as SupabaseJob);
        }
      };
      loadJob();
    }
  }, [applicant]);

  if (isLoading) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Loading applicant...
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/applicants">
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Applicant Not Found</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p>The applicant you&apos;re looking for doesn&apos;t exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get badge variant based on job match
  const getMatchBadgeVariant = (match: string) => {
    switch (match) {
      case "Top Performer":
        return "success";
      case "Potential":
        return "warning";
      case "Under Performer":
        return "danger";
      default:
        return "default";
    }
  };

  const handleApprove = async () => {
    const newStatus = "Approved";
    setStatus(newStatus);
    if (useSupabase && applicant) {
      const { error } = await (supabase as any)
        .from("applicants")
        .update({ application_status: newStatus })
        .eq("applicant_id", applicant.applicant_id);
      if (error) {
        alert("Failed to update status in Supabase");
        setStatus("Pending Review");
      }
    }
  };

  const handleReject = async () => {
    const newStatus = "Rejected";
    setStatus(newStatus);
    if (useSupabase && applicant) {
      const { error } = await (supabase as any)
        .from("applicants")
        .update({ application_status: newStatus })
        .eq("applicant_id", applicant.applicant_id);
      if (error) {
        alert("Failed to update status in Supabase");
        setStatus("Pending Review");
      }
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-2 sm:gap-4">
        <Link href="/applicants">
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold">Applicant Details</h1>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Name
              </label>
              <p className="text-lg font-semibold">
                {applicant.applicant_name}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Email Address
              </label>
              <p className="text-lg">{applicant.applicant_email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Applied For
              </label>
              <p className="text-lg">{job?.job_title || "Unknown Job"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Job Match
              </label>
              <div className="mt-1">
                <Badge
                  variant={getMatchBadgeVariant(applicant.applicant_job_match)}
                  className="text-sm px-3 py-1"
                >
                  {applicant.applicant_job_match}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status & Actions */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">
              Application Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Current Status
              </label>
              <div className="mt-2">
                {status === "Pending Review" && (
                  <Badge variant="warning" className="text-sm px-3 py-1">
                    Pending Review
                  </Badge>
                )}
                {status === "Approved" && (
                  <Badge variant="success" className="text-sm px-3 py-1">
                    Approved
                  </Badge>
                )}
                {status === "Rejected" && (
                  <Badge variant="danger" className="text-sm px-3 py-1">
                    Rejected
                  </Badge>
                )}
              </div>
            </div>

            {status === "Pending Review" && (
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleApprove}
                  className="flex-1 bg-green-200 hover:bg-green-300 text-green-900 cursor-pointer"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button
                  onClick={handleReject}
                  variant="destructive"
                  className="flex-1 bg-red-200 hover:bg-red-300 text-red-900 cursor-pointer"
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Experience */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">
            Years of Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <pre className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">
            {applicant.years_of_experience}
          </pre>
        </CardContent>
      </Card>

      {/* Qualifications */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">
            Notable Qualifications
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <pre className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">
            {applicant.notable_qualifications}
          </pre>
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">
            Notable Work Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <pre className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">
            {applicant.notable_work_experience}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
