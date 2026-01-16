import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil } from "lucide-react";
import clsx from "clsx";

export const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    status: "Applied",
    type: "Full-time",
    dateApplied: "2025-10-12",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "FinEdge",
    status: "Interview",
    type: "Remote",
    dateApplied: "2025-09-28",
  },
  {
    id: 3,
    title: "Product Designer",
    company: "Designify",
    status: "Offer",
    type: "Hybrid",
    dateApplied: "2025-09-21",
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "CloudWave",
    status: "Rejected",
    type: "Contract",
    dateApplied: "2025-09-10",
  },
  {
    id: 5,
    title: "Mobile Developer",
    company: "Appverse",
    status: "Applied",
    type: "Full-time",
    dateApplied: "2025-10-03",
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "NextHost",
    status: "Interview",
    type: "On-site",
    dateApplied: "2025-09-15",
  },
];

const statusStyles: Record<string, string> = {
  Applied: "bg-gray-100 text-gray-700",
  Interview: "bg-blue-50 text-blue-700",
  Offer: "bg-purple-50 text-purple-700",
  Rejected: "bg-red-50 text-red-700",
};

export default function MyJobsTable() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobs.map((job) => (
            <TableRow
              key={job.id}
              className="hover:bg-gray-50 transition"
            >
              <TableCell className="font-medium text-gray-800">
                {job.title}
              </TableCell>

              <TableCell className="text-gray-600">
                {job.company}
              </TableCell>

              <TableCell>
                <span
                  className={clsx(
                    "px-3 py-1 text-xs font-medium rounded-full",
                    statusStyles[job.status]
                  )}
                >
                  {job.status}
                </span>
              </TableCell>

              <TableCell className="text-gray-600">
                {job.type}
              </TableCell>

              <TableCell className="text-gray-500">
                {job.dateApplied}
              </TableCell>

              <TableCell>
                <div className="flex justify-end gap-2">
                  <button className="p-2 rounded-md border border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition">
                    <Eye size={18} />
                  </button>

                  <button className="p-2 rounded-md border border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition">
                    <Pencil size={18} />
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
