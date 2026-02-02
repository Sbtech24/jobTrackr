"use client";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { forgotPassword } from "@/lib/api/auth";
import { SuccessModal } from "@/components/shared/SuccessModal";
import { useUser } from "@/components/context/UserProfileContext";
type ForgotPasswordFormData = {
  newPassword: string;
  confirmPassword: string;
};

export default function Settings() {
  const {user,isLoading} = useUser()
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setServerError(null);
    setLoading(true);

    try {
      await forgotPassword({
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      setSuccessOpen(true);
      reset({
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setServerError(error.response?.data?.message || "Update failed");
      } else {
        setServerError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Success Modal */}
      <SuccessModal
        open={successOpen}
        onOpenChange={setSuccessOpen}
        title="Password Updated"
        message="Your password has been updated successfully."
      />

      <div className="p-4 sm:p-8 space-y-8">
        <h1 className="text-gray-800 text-2xl sm:text-3xl font-semibold">
          Settings
        </h1>

        <section className="space-y-8">
          {/* Profile Section */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 space-y-6">
            <h2 className="font-semibold text-lg text-gray-700 border-b pb-2">
              Profile
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Name
                </label>
                {isLoading ? (
                  <Skeleton className="w-full h-10 rounded-lg" />
                ) : (
                  <input
                    type="text"
                    defaultValue={user?.username}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-600"
                  />
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Email
                </label>
                {isLoading ? (
                  <Skeleton className="w-full h-10 rounded-lg" />
                ) : (
                  <input
                    type="text"
                    defaultValue={user?.email}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-600"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 space-y-6">
            <h2 className="font-semibold text-lg text-gray-700 border-b pb-2">
              Password
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                {...register("newPassword", {
                  required: "Password is required",
                })}
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                })}
              />
            </div>

            {serverError && (
              <p className="text-sm text-red-600">{serverError}</p>
            )}

            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className="bg-primary hover:bg-primary-light text-white font-medium px-6 py-2 rounded-lg"
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </div>

          {/* Theme Section */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6">
            <h2 className="font-semibold text-lg text-gray-700 border-b pb-2">
              Appearance
            </h2>

            <div className="flex items-center justify-between mt-4">
              <label className="text-gray-700 font-medium">Dark Mode</label>
              <Switch />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
