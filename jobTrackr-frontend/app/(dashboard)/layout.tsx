import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Dashboard/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
        <SidebarTrigger className="hidden" />


      <main>
        <section className="w-full">
          <Input placeholder="search for a Job, status,company..." className="hidden md:block"/>

          {/* User profile */}
          <div className="flex justify-end">
            <div className="flex items-center gap-2">
            <p>Semilore</p>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        <SidebarTrigger className="sm:hidden" />


          </div>
          
          
        </section>
    
        {children}
      </main>
    </SidebarProvider>
  );
}
