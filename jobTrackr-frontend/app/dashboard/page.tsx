import { Overview } from "@/components/shared/Overview";
import { Briefcase, Clock, MessageSquare, XCircle } from "lucide-react";
import dynamic from "next/dynamic";

const MyJobsTable = dynamic(() => import("@/components/Dashboard/JobsTable"));

const jobStats = [
  {
    label: "New",
    value: 2,
    icon: Briefcase,
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  {
    label: "In Progress",
    value: 3,
    icon: Clock,
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  {
    label: "Interview",
    value: 2,
    icon: MessageSquare,
    bg: "bg-purple-50",
    text: "text-purple-700",
  },
  {
    label: "Discarded",
    value: 2,
    icon: XCircle,
    bg: "bg-red-50",
    text: "text-red-700",
  },
];
export default function Dashboard() {
  return (
    <div className="p-4 sm:p-8 space-y-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
        Dashboard
      </h1>


      <section className="space-y-4">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <h2 className="text-lg font-semibold text-gray-800">Overview</h2>
          <p className="text-sm text-gray-500">Your job application summary</p>
        </div>

       <Overview/>
      </section>

      {/* Jobs Table */}
      <section>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">My Jobs</h2>

          <MyJobsTable />
        </div>
      </section>
    </div>
  );
}
