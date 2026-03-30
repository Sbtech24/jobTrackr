
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Overview } from "@/components/shared/Overview";


const JobBarChart = dynamic(()=>import('@/components/stats/Barchart'), {
  loading: () => <Skeleton className="w-full h-[300px] rounded-lg" />
})
const JobStatusPieChart = dynamic(()=>import("@/components/stats/PieChart"), {
  loading: () => <Skeleton className="w-full h-[300px] rounded-lg" />
})
const StatsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold md:text-3xl">Stats</h1>
      <section>
        <div className="rounded-2xl p-6 space-y-6">
         <Overview/>
        </div>
      </section>

      <section>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <JobBarChart />
          </div>
          <div className="flex-1">
            <JobStatusPieChart />
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatsPage;
