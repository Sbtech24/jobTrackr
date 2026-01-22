"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash } from "lucide-react";
import clsx from "clsx";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllJobs, deleteJob } from "@/lib/api/jobs";
import { ViewJobModal } from "./ViewJobModal";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const statusStyles: Record<string, string> = {
  Applied: "bg-gray-100 text-gray-700",
  Interview: "bg-blue-50 text-blue-700",
  Offer: "bg-purple-50 text-purple-700",
  Rejected: "bg-red-50 text-red-700",
};

export default function MyJobsTable() {
  const [viewJobId, setViewJobId] = useState<string | null>(null);
  const{isAuthenticated,isAuthReady} = useAuth()


  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchAllJobs,
    enabled:isAuthenticated
  });

  const deleteMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
  const handleViewJob = (jobId: string) => {
    setViewJobId(jobId);
  };

  if (isLoading) return <p>Loading ...</p>;

  if (error) return <p>Error occured: {error.message}</p>;

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.data.map((job: any) => (
            <TableRow key={job.id} className="hover:bg-gray-50 transition">
              <TableCell className="font-medium text-gray-800">
                {job.title}
              </TableCell>

              <TableCell className="text-gray-600">{job.company}</TableCell>

              <TableCell>
                <span
                  className={clsx(
                    "px-3 py-1 text-xs font-medium rounded-full",
                    statusStyles[job.status],
                  )}
                >
                  {job.status}
                </span>
              </TableCell>

              <TableCell className="text-gray-500">
                {job.date_applied}
              </TableCell>

              <TableCell>
                <div className="flex justify-end gap-2">
                  <button
                    className="p-2 rounded-md border border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition"
                    onClick={() => handleViewJob(job.id)}
                  >
                    <Eye size={18} />
                  </button>
                  {viewJobId && (
                    <ViewJobModal
                      id={viewJobId}
                      open={!!viewJobId}
                      onOpenChange={(open) => {
                        if (!open) setViewJobId(null);
                      }}
                    />
                  )}

                  <button
                    className="p-2 rounded-md border border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition"
                    onClick={() => deleteMutation.mutate(job.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
