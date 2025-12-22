"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Applied", value: 40 },
  { name: "Interview", value: 15 },
  { name: "Offer", value: 8 },
  { name: "Rejected", value: 22 },
];

const COLORS = {
  Applied: "#22c55e",
  Interview: "#f97316",
  Offer: "#3b82f6",
  Rejected: "#ef4444",
};

/* ---------- Custom Tooltip ---------- */
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const { name, value, fill } = payload[0];

    return (
      <div className="bg-white px-3 py-2 rounded-md shadow border text-sm flex items-center gap-2">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: fill }}
        />
        <span className="font-medium">{name}:</span>
        <span>{value}</span>
      </div>
    );
  }
  return null;
};

const JobStatusPieChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm h-[300px]">
      <h1 className="text-lg font-semibold mb-3">Job status</h1>

      <div className="flex items-center h-[220px]">
        {/* Pie Chart */}
        <div className="w-1/2 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={55}
                paddingAngle={3}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[entry.name as keyof typeof COLORS]}
                  />
                ))}
              </Pie>

              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <div className="w-1/2 flex flex-col gap-3 pl-4">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[item.name as keyof typeof COLORS],
                  }}
                />
                <span className="font-medium">{item.name}</span>
              </div>
              {/* <span className="text-gray-600">{item.value}</span> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobStatusPieChart;
