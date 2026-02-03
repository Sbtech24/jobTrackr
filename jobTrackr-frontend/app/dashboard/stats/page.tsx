import { Briefcase, Clock, MessageSquare, XCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
const jobData =  [
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
         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {jobData.map((stat) => {
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
