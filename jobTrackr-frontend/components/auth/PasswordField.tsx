"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  register: UseFormRegisterReturn;
  error?: string;
};

export default function PasswordField({ register, error }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        placeholder="••••••••"
        {...register}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
