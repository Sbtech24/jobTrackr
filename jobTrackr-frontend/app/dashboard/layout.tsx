"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Dashboard/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useUser } from "@/components/context/UserProfileContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function Layout({ children }: { children: React.ReactNode }) {
  const {user,isLoading} = useUser()
  return (
    <SidebarProvider>
      {/* Root Flex Container */}
      <div className="flex min-h-screen w-full bg-jobtrackr-background overflow-hidden">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="flex items-center justify-between px-4 sm:px-8 py-4 border-b bg-white shadow-sm w-full">
            {/* Left Section */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <SidebarTrigger className="block sm:hidden" />
              <Input
                placeholder="Search for a job, status, company..."
                className="hidden md:block w-[350px] rounded-xl border-gray-300 focus:ring-2 focus:ring-jobtrackr-primary focus:border-jobtrackr-primary"
              />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {isLoading ? (
                <Skeleton className="w-32 h-6 hidden sm:block" />
              ) : (
                <p className="font-medium text-gray-700 hidden sm:block">{user?.username}</p>
              )}
              {isLoading ? (
                <Skeleton className="h-9 w-9 rounded-full" />
              ) : (
                <Avatar className="h-9 w-9 ring-2 ring-jobtrackr-primary/10">
                  <AvatarImage src={user?.profilePic || ""} alt="User" />
                  <AvatarFallback>{user?.username.slice(0,2)}</AvatarFallback>
                </Avatar>
              )}
            </div>
          </header>

          {/* Main Page Content */}
          <main className="flex-1 w-full overflow-y-auto px-4 sm:px-8 py-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
