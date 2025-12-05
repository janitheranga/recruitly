"use client";

import { useState } from "react";
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
import { Eye } from "lucide-react";
import { mockApplicants } from "@/lib/data";
import { JobMatchLevel } from "@/lib/types";

export default function ApplicantsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const applicantsPerPage = 10;

  // Pagination logic
  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentApplicants = mockApplicants.slice(
    indexOfFirstApplicant,
    indexOfLastApplicant
  );
  const totalPages = Math.ceil(mockApplicants.length / applicantsPerPage);

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

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Job Applicant Data</h1>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Job Match</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentApplicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell className="font-medium">{applicant.id}</TableCell>
                  <TableCell>{applicant.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {applicant.email}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getMatchBadgeVariant(applicant.jobMatch)}>
                      {applicant.jobMatch}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/applicants/${applicant.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-blue-900 sm:text-sm cursor-pointer hover:bg-blue-50"
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
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
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
