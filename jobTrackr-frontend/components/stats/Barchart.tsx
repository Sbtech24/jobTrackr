"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", jobs: 5 },
  { month: "Feb", jobs: 8 },
  { month: "Mar", jobs: 12 },
  { month: "Apr", jobs: 7 },
  { month: "May", jobs: 15 },
  { month: "Jun", jobs: 10 },
  { month: "Jul", jobs: 9 },
  { month: "Aug", jobs: 14 },
  { month: "Sep", jobs: 11 },
  { month: "Oct", jobs: 6 },
  { month: "Nov", jobs: 13 },
  { month: "Dec", jobs: 4 },
];

const JobBarChart = () => {
  return (
    <div style={{ width: "100%", height: 300 }} className="bg-white rounded-lg p-4 border shadow-sm">
        <h1 className="text-lg font-semibold">Applications over Time</h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} className="p-2 mx-auto">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar
            dataKey="jobs"
            fill="#93c5fd" // light blue (Tailwind blue-300)
            radius={[6, 6, 0, 0]} // rounded top corners (nice touch)
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default JobBarChart;
