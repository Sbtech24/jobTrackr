"use client";

import { useEffect } from "react";
import { refreshAccessToken } from "@/lib/api/auth";

export default function ClientInit({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    refreshAccessToken().catch(() => {
      // Not logged in or refresh token expired
      // Intentionally silent
    });
  }, []);

  return <>{children}</>;
}
