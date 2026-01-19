"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import PasswordField from "@/components/auth/PasswordField";
import { useRouter } from "next/navigation";
import { RegisterUser } from "@/lib/api/auth";
import axios from "axios";

type RegisterFormData = {
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onsubmit = async (data: RegisterFormData) => {
    setServerError(null);
    setLoading(true);
    try {
      const response = await RegisterUser({
        email: data.email,
        password: data.password,
      });
      console.log(response)
      router.replace("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setServerError(error.response?.data?.message || "Login failed");
      } else {
        setServerError("Something went wrong");
      }
    } finally {
      setLoading(false);
    

    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Start tracking your job applications in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
            {/* <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div> */}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@email.com" {...register("email",{
                required:"email is required"
              })}/>
            </div>

            <div className="space-y-2">
              <PasswordField
                register={register("password", {
                  required: "Password is required",
                })}
                error={errors.password?.message}
              />
            </div>

            <Button className="w-full" >Create account</Button>

            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-medium">
                Log in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
