
import dynamic from "next/dynamic";
const jobData = [
  { name: "Total Jobs", value: 2 },
  { name: "Interviews", value: 3 },
  { name: "Offers", value: 2 },
  { name: "Rejections", value: 2 },
];

const JobBarChart = dynamic(()=>import('@/components/stats/Barchart'))
const JobStatusPieChart = dynamic(()=>import("@/components/stats/PieChart"))
const StatsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold md:text-3xl">Stats</h1>
      <section>
        <div className="rounded-2xl p-6 space-y-6">
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
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {item.value}
                </p>
                <p className="text-sm font-medium text-gray-500 capitalize">
                  {item.name}
                </p>
              </div>
            ))}
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
