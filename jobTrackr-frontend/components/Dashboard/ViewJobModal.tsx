"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fetchJobById } from "@/lib/api/jobs";
import { useQuery } from "@tanstack/react-query";
import { CalendarIcon, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { UpdateJobById } from "@/lib/api/jobs";

interface Job {
  id: string;
  title: string;
  company: string;
  status: string;
  date_applied: string;
  description: string;
}

interface ViewJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  refetch: () => void;
}

const statusOptions = ["Applied", "Interview", "Offer", "Rejected"];

const statusStyles: Record<string, string> = {
  Applied: "bg-gray-100 text-gray-700",
  Interview: "bg-blue-50 text-blue-700",
  Offer: "bg-purple-50 text-purple-700",
  Rejected: "bg-red-50 text-red-700",
};

function formatDateForInput(date?: string) {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().split("T")[0];
}

function formatDateForDisplay(date?: string) {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ViewJobModal({ open, onOpenChange, id,refetch }: ViewJobModalProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
    enabled: open && !!id,
  });

  const [form, setForm] = useState({
    title: "",
    company: "",
    status: "Applied",
    date_applied: "",
    description: "",
  });
 

  useEffect(() => {
    if (!data) return;

    setForm({
      title: data.title ?? "",
      company: data.company ?? "",
      status: data.status ?? "Applied",
      date_applied: formatDateForInput(data.date_applied),
      description: data.description ?? "",
    });
  }, [data]);

  const handleUpdateForm = () => {
    try {
      UpdateJobById(id, form);
      refetch()
    
    } catch (e) {
      console.log("Error updating job");
    }
  };

  if (error) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[calc(100vw-1rem)] max-w-lg rounded-2xl border border-gray-200 bg-white p-0 shadow-2xl sm:w-full">
          <div className="p-4 sm:p-6">
            <DialogTitle className="text-lg font-semibold text-gray-900 sm:text-xl">
              Error loading job
            </DialogTitle>
            <p className="mt-2 text-sm text-red-600">
              {(error as Error).message}
            </p>
            <div className="mt-6 flex justify-end">
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[calc(100vw-1rem)]
          max-w-[680px]
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-0
          shadow-2xl
          sm:w-full
          max-h-[90vh]
          overflow-hidden
          flex
          flex-col
        "
      >
        <DialogHeader className="shrink-0 border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-5">
          <div className="pr-8">
            <DialogTitle className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Edit Job
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-gray-500">
              Update your application details
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-10 animate-pulse rounded-md bg-gray-100" />
              <div className="h-10 animate-pulse rounded-md bg-gray-100" />
              <div className="h-10 animate-pulse rounded-md bg-gray-100" />
              <div className="h-10 animate-pulse rounded-md bg-gray-100" />
              <div className="h-28 animate-pulse rounded-md bg-gray-100" />
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Software Engineer"
                  className="h-11 rounded-md border-gray-300 text-sm sm:h-12 sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Company
                </label>
                <Input
                  value={form.company}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, company: e.target.value }))
                  }
                  placeholder="TechCorp"
                  className="h-11 rounded-md border-gray-300 text-sm sm:h-12 sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>

                <div className="relative">
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, status: e.target.value }))
                    }
                    className="
                      h-11
                      w-full
                      appearance-none
                      rounded-md
                      border
                      border-gray-300
                      bg-white
                      px-3
                      pr-10
                      text-sm
                      text-gray-900
                      outline-none
                      transition
                      focus:border-gray-400
                      focus:ring-2
                      focus:ring-gray-200
                      sm:h-12
                      sm:text-base
                    "
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                </div>

                <div>
                  <span
                    className={clsx(
                      "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                      statusStyles[form.status],
                    )}
                  >
                    {form.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Date Applied
                </label>

                <div className="relative">
                  <Input
                    type="date"
                    value={form.date_applied}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        date_applied: e.target.value,
                      }))
                    }
                    className="h-11 rounded-md border-gray-300 pr-10 text-sm sm:h-12 sm:text-base"
                  />
                  <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                </div>

                {form.date_applied && (
                  <p className="text-xs text-gray-500">
                    {formatDateForDisplay(form.date_applied)}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Notes
                </label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Add notes about this application..."
                  className="min-h-[120px] resize-none rounded-md border-gray-300 text-sm sm:min-h-[140px] sm:text-base"
                />
              </div>
            </div>
          )}
        </div>

        <div
          className="
            shrink-0
            border-t
            border-gray-200
            bg-white
            px-4
            py-4
            sm:px-6
          "
        >
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full rounded-md px-6 sm:w-auto"
              >
                Cancel
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                type="button"
                className="h-11 w-full rounded-md bg-blue-600 px-6 hover:bg-blue-700 sm:w-auto"
                onClick={() => {
                  // console.log("edited job payload", form);
                  // UpdateJobById(id,form)
                  handleUpdateForm();
                }}
              >
                Save Changes
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
