import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import OverviewPage from "@/pages/OverviewPage";
import MessagesPage from "@/pages/MessagesPage";
import TimelinePage from "@/pages/TimelinePage";
import MapsPage from "@/pages/MapsPage";
import MediaPage from "@/pages/MediaPage";
import InsightsPage from "@/pages/InsightsPage";
import UploadPage from "@/pages/UploadPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/maps" element={<MapsPage />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
