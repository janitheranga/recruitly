"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Eye } from "lucide-react";
import { mockApplicants } from "@/lib/data";
import { JobMatchLevel, ApplicationStatus } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { Database } from "@/lib/database.types";

type SupabaseApplicant = Database["public"]["Tables"]["applicants"]["Row"];

export default function ApplicantsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const applicantsPerPage = 10;
  const [supabaseApplicants, setSupabaseApplicants] = useState<
    SupabaseApplicant[]
  >([]);
  const [useSupabase, setUseSupabase] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        setUseSupabase(true);
      }
      setIsLoading(false);
    };
    loadApplicants();
  }, []);

  // Pagination logic
  const dataToDisplay = useSupabase ? supabaseApplicants : mockApplicants;
  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentApplicants = dataToDisplay.slice(
    indexOfFirstApplicant,
    indexOfLastApplicant
  );
  const totalPages = Math.ceil(dataToDisplay.length / applicantsPerPage);

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

  // Get badge variant based on application status
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Pending Review":
        return "warning";
      case "Rejected":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <LoadingSpinner isOpen={isLoading} message="Loading applicants..." />
      <h1 className="text-2xl sm:text-3xl font-bold">Job Applicant Data</h1>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="p-6 text-center text-muted-foreground">
              Loading applicants...
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Job Match</TableHead>
                  <TableHead>Application Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentApplicants.map((applicant: any) => (
                  <TableRow
                    key={useSupabase ? applicant.applicant_id : applicant.id}
                  >
                    <TableCell className="font-medium">
                      {useSupabase
                        ? `APP-${String(applicant.applicant_id).padStart(
                            3,
                            "0"
                          )}`
                        : applicant.id}
                    </TableCell>
                    <TableCell>
                      {useSupabase ? applicant.applicant_name : applicant.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {useSupabase
                        ? applicant.applicant_email
                        : applicant.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getMatchBadgeVariant(
                          useSupabase
                            ? applicant.applicant_job_match
                            : applicant.jobMatch
                        )}
                      >
                        {useSupabase
                          ? applicant.applicant_job_match
                          : applicant.jobMatch}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadgeVariant(
                          useSupabase
                            ? applicant.application_status
                            : applicant.applicationStatus
                        )}
                      >
                        {useSupabase
                          ? applicant.application_status
                          : applicant.applicationStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/applicants/${
                          useSupabase ? applicant.applicant_id : applicant.id
                        }`}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs sm:text-sm cursor-pointer bg-amber-50 text-amber-600 hover:text-amber-700 dark:hover:bg-amber-900/30 dark:text-amber-400"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
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
