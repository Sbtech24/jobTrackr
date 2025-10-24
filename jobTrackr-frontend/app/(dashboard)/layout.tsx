import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Welcome",
};


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  
        <main>{children}</main>
     
  )
}