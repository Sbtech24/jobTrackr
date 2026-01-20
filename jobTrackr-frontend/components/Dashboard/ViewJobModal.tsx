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
import { fetchJobById } from "@/lib/api/jobs";
import { useQuery } from "@tanstack/react-query";
import { error } from "console";

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
}

export function ViewJobModal({
  open,
  onOpenChange,
  id,
}: ViewJobModalProps) {
  const {data,isLoading,error} = useQuery({queryKey:["job"],queryFn:()=>fetchJobById(id)})

  if(isLoading) return <p>Loading...</p>

  if(error) return <p>Erro showing job {error.message}</p>

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-150">
        <DialogHeader>
          <DialogTitle>{data?.title}</DialogTitle>
          <DialogDescription>Job Details</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="font-semibold">Company:</label>
            <p>{data?.company}</p>
          </div>
          <div>
            <label className="font-semibold">Status:</label>
            <p>{data?.status}</p>
          </div>
          <div>
            <label className="font-semibold">Date Applied:</label>
            <p>{new Date(data?.date_applied).toLocaleDateString()}</p>
          </div>
          <div>
            <label className="font-semibold">Description:</label>
            <p className="whitespace-pre-wrap">{data?.description}</p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
