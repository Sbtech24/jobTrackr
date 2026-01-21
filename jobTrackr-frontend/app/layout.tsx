"use client"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientInit from "@/components/auth/ClientInit"
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import { UserContextProvider } from "@/components/context/UserProfileContext"


const client = new QueryClient()
// Load Inter font (you can change it)
const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: {
//     default: "Job Tracker",
//     template: "%s | Job Tracker",
//   },
//   description: "Track and manage your job applications easily.",
//   icons: {
//     icon: "/favicon.ico",
//   },
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen antialiased`}
      >
       
        <QueryClientProvider client={client}>
           <UserContextProvider>

  
        <ClientInit>{children}</ClientInit>
        </UserContextProvider>
       </QueryClientProvider>
       
      </body>
    </html>
  )
}
