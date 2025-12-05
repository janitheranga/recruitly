"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, X } from "lucide-react";
import { getApplicantById, getJobById } from "@/lib/data";
import { JobMatchLevel } from "@/lib/types";
import Link from "next/link";

export default function ApplicantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const applicantId = params.id as string;
  const applicant = getApplicantById(applicantId);
  const [status, setStatus] = useState<"pending" | "approved" | "declined">(
    "pending"
  );

  if (!applicant) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/applicants">
            <Button variant="ghost" size="icon">
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

  const job = getJobById(applicant.jobId);

  // Get badge variant based on job match
  const getMatchBadgeVariant = (match: JobMatchLevel) => {
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

  const handleApprove = () => {
    setStatus("approved");
    // In a real app, this would make an API call
  };

  const handleDecline = () => {
    setStatus("declined");
    // In a real app, this would make an API call
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-2 sm:gap-4">
        <Link href="/applicants">
          <Button variant="ghost" size="icon">
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
              <p className="text-lg font-semibold">{applicant.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Email Address
              </label>
              <p className="text-lg">{applicant.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Applied For
              </label>
              <p className="text-lg">{job?.title || "Unknown Job"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Job Match
              </label>
              <div className="mt-1">
                <Badge
                  variant={getMatchBadgeVariant(applicant.jobMatch)}
                  className="text-sm px-3 py-1"
                >
                  {applicant.jobMatch}
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
                {status === "pending" && (
                  <Badge variant="outline" className="text-sm px-3 py-1">
                    Pending Review
                  </Badge>
                )}
                {status === "approved" && (
                  <Badge variant="success" className="text-sm px-3 py-1">
                    Approved
                  </Badge>
                )}
                {status === "declined" && (
                  <Badge variant="danger" className="text-sm px-3 py-1">
                    Declined
                  </Badge>
                )}
              </div>
            </div>

            {status === "pending" && (
              <div className="flex gap-2 pt-4">
                <Button onClick={handleApprove} className="flex-1">
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button
                  onClick={handleDecline}
                  variant="destructive"
                  className="flex-1"
                >
                  <X className="mr-2 h-4 w-4" />
                  Decline
                </Button>
              </div>
            )}

            {status !== "pending" && (
              <div className="pt-4">
                <Button
                  onClick={() => setStatus("pending")}
                  variant="outline"
                  className="w-full"
                >
                  Reset Status
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
            {applicant.yearsOfExperience}
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
            {applicant.notableQualifications}
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
            {applicant.notableWorkExperience}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
