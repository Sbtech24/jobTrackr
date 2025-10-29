import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pen } from "lucide-react";

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

export default function MyJobsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date Applied</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell>{job.title}</TableCell>
            <TableCell>{job.company}</TableCell>
            <TableCell>{job.status}</TableCell>
            <TableCell>{job.type}</TableCell>
            <TableCell>{job.dateApplied}</TableCell>
            <TableCell>
                <div className="flex gap-3">
                    <Eye className="border border-rounded p-1" color="green" size={35}/>
                    <Pen className="border border-rounded p-1" color="blue" size={35}/>
                </div>
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
