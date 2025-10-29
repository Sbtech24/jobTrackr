"use client";

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
import { Textarea } from "@/components/ui/textarea"; // s
import { useState } from "react";

export default function AddJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    status: "",
    type: "",
    dateApplied: "",
    description: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New job added:", form);
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
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Job Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                placeholder="e.g. Frontend Developer"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="e.g. TechNova"
                value={form.company}
                onChange={(e) => handleChange("company", e.target.value)}
              />
            </div>

            {/* Status */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
            
                  value={form.status}
                  onValueChange={(val) => handleChange("status", val)}
                  
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
              </div>

              {/* Job Type */}
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Write a short description about the job..."
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="resize-none min-h-[120px]"
              />
            </div>

            {/* Date Applied */}
            <div className="space-y-2">
              <Label htmlFor="date">Date Applied</Label>
              <Input
                type="date"
                id="date"
                value={form.dateApplied}
                onChange={(e) => handleChange("dateApplied", e.target.value)}
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-jobtrackr-primary hover:bg-jobtrackr-primary-dark text-white font-medium rounded-xl"
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
