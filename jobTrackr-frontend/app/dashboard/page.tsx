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

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-8 space-y-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
        Dashboard
      </h1>

      {/* Job Stats */}
      <section>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Job Applications
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {jobData.map((item, i) => (
              <div
                key={i}
                className="
                  rounded-xl border border-gray-200
                  p-4 bg-white
                  transition
                  hover:border-indigo-300
                  hover:bg-indigo-50/40
                  hover:shadow-md
                  cursor-pointer
                "
              >
                <p className="text-sm font-medium text-gray-500 capitalize">
                  {item.name}
                </p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
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