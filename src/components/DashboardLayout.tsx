import { ReactNode, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ForensicSidebar } from "@/components/ForensicSidebar";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Menu, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const handleExport = (format: "pdf" | "csv") => {
    toast.success(`Exporting report as ${format.toUpperCase()}...`, {
      description: "Report generation simulated. File would download in production.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ForensicSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="hidden sm:block">
                <GlobalSearch />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-mono"
                onClick={() => handleExport("pdf")}
              >
                <Download className="w-3 h-3 mr-1" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-mono"
                onClick={() => handleExport("csv")}
              >
                <Download className="w-3 h-3 mr-1" />
                CSV
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
