"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PasswordField from "@/components/auth/PasswordField";

export default function LoginPage(){
    return(
         <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Log in to continue tracking your job applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@email.com" />
            </div>

            <div className="space-y-2">
             
             <PasswordField/>
            </div>

            <Button className="w-full">Login</Button>

            <p className="text-sm text-center text-muted-foreground">
              Don’t have an account?{" "}
              <Link href="/register" className="text-primary font-medium">
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
        
    )
}