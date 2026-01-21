"use client"
import {
  Home,
  CirclePlus,
  ChartLine,
  Settings,
  Briefcase,
  LogOut,
  X,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { logOut } from "@/lib/api/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useUser } from "../context/UserProfileContext"
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Add Job",
    url: "/dashboard/add-job",
    icon: CirclePlus,
  },
  {
    title: "Stats",
    url: "/dashboard/stats",
    icon: ChartLine,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null);
  const {user,isLoading} = useUser()
  


  const handleLogout = async ()=>{
    try{
      const response = await logOut()
      console.log(response)
      router.push("/login")

    }catch(error){
      console.log(error)
    }
  }
  return (
    <Sidebar className="bg-primary text-white">
      <SidebarContent className="flex h-full flex-col px-4 py-6">
        {/* Top Section */}
        <SidebarGroup>
          <div className="flex items-center justify-between mb-8">
            <SidebarGroupLabel className="flex items-center gap-3 text-lg font-semibold">
              <Briefcase className="h-5 w-5" />
              JobTrackr
            </SidebarGroupLabel>

            {/* Close button (mobile only) */}
            <SidebarTrigger className="md:hidden">
              <X className="h-5 w-5" />
            </SidebarTrigger>
          </div>

          {/* Menu */}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="
                      flex items-center gap-3 
                      px-3 py-2 rounded-lg
                      text-white/80
                      hover:text-white
                      hover:bg-white/10
                      transition
                    "
                  >
                    <a href={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Push content above */}
        <div className="flex-1" />

        {/* User Section */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center justify-between px-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {user?.username}
              </span>
              <span className="text-xs text-white/60">
                Logged in
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="
                flex items-center gap-2
                text-sm text-white/70
                hover:text-white
                transition
              "
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
