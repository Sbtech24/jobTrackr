"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { addJob,addJobPayLoad } from "@/lib/api/jobs";
import axios from "axios";



export default function AddJob() {
    const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, control,reset } = useForm<addJobPayLoad>({
    defaultValues: {
      title: "",
      company: "",
      status: "",
      date_applied: "",
      description: "",
    },
  });

  const onSubmit =async (data: addJobPayLoad) => {
    console.log("New job added:", data);
    try{
      const response = await addJob({
        title:data.title,
        company:data.company,
       status:data.status,
       description:data.description,
       date_applied:data.date_applied
      })
      console.log(response)
      reset({
      title: "",
      company: "",
      status: "",
      date_applied: "",
      description: "",
      })
    }catch(error){
       if (axios.isAxiosError(error)) {
        setServerError(error.response?.data?.message || "Login failed");
        console.log(error)
      } else {
        setServerError("Something went wrong");
      }

    }
  };

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add Job</h1>

      <Card className="max-w-2xl shadow-sm border border-gray-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Job Details
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Job Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                placeholder="e.g. Frontend Developer"
                {...register("title")}
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="e.g. TechNova"
                {...register("company")}
              />
            </div>

            {/* Status */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Applied">Applied</SelectItem>
                        <SelectItem value="Interview">Interview</SelectItem>
                        <SelectItem value="Offer">Offer</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Write a short description about the job..."
                className="resize-none min-h-[120px]"
                {...register("description")}
              />
            </div>

            {/* Date Applied */}
            <div className="space-y-2">
              <Label htmlFor="date">Date Applied</Label>
              <Input
                type="date"
                id="date"
                {...register("date_applied")}
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-primary-light cursor-pointer hover:bg-primary text-white font-medium rounded-xl"
              >
                Save Job
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
