import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MyJobsTable from "@/components/Dashboard/JobsTable";
import { Value } from "@radix-ui/react-select";
const jobData = [
  { name: "New", value: 2 },
  { name: "In progress", value: 3 },
  { name: "Interview", value: 2 },
  { name: "Discarded", value: 2 },
];
import { Briefcase, Clock, MessageSquare, XCircle } from "lucide-react";

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

      {/* Job Stats */}
       {/* Overview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Overview
          </h2>
          <p className="text-sm text-gray-500">
            Your job application summary
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {jobStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="
                  rounded-2xl border border-gray-200 bg-white
                  p-5 transition
                  hover:shadow-sm
                "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                  </div>

                  <div
                    className={`
                      h-10 w-10 rounded-full flex items-center justify-center
                      ${stat.bg} ${stat.text}
                    `}
                  >
                    <Icon size={18} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Jobs Table */}
      <section>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">
            My Jobs
          </h2>

          <MyJobsTable />
        </div>
      </section>
    </div>
  );
}