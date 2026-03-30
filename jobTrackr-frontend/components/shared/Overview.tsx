"use client";

import { Briefcase, Clock, MessageSquare, XCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchOverviewData } from "@/lib/api/overview";

export function Overview() {
  const { isAuthenticated } = useAuth();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["overview"],
    queryFn: fetchOverviewData,
    enabled: isAuthenticated,
  });



  const jobData = [
    {
      label: "Interview",
      value: data?.overview.interview,
      icon: Briefcase,
      bg: "bg-blue-50",
      text: "text-blue-700",
    },
    {
      label: "Applied",
      value: data?.overview.applied,
      icon: Clock,
      bg: "bg-amber-50",
      text: "text-amber-700",
    },
    {
      label: "Offer",
      value: data?.overview.offer,
      icon: MessageSquare,
      bg: "bg-purple-50",
      text: "text-purple-700",
    },
    {
      label: "Rejected",
      value: data?.overview.rejected,
      icon: XCircle,
      bg: "bg-red-50",
      text: "text-red-700",
    },
  ];

  if (error) return <p>Error occured: {error.message}</p>;

  return (
    <>
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
    </>
  );
}
