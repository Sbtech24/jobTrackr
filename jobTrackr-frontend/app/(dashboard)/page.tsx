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
} from "@/components/ui/table"
import MyJobsTable from "@/components/Dashboard/JobsTable";




export default function Dashboard() {
  return (
    <div className="p-4 sm:p-8 space-y-8">
      <h1 className="text-gray-800 text-2xl sm:text-3xl font-semibold">
        Dashboard
      </h1>

      <section className="space-y-8">
        {/* Profile Section */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 space-y-6">
          <h2 className="font-semibold text-lg text-gray-700 border-b pb-2">
            My Jobs
          </h2>

          <MyJobsTable/>
        </div>

    
    
      </section>
    </div>
  );
}
