import AppLayout from "@/components/layout/AppLayout";

import StatsCards from "@/components/dashboard/StatsCards";
import QuickActions from "@/components/dashboard/QuickActions";
import ProjectsSection from "@/components/dashboard/ProjectsSection";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function Home() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <StatsCards />
        <QuickActions />
        <ProjectsSection />
        <RecentActivity />
      </div>
    </AppLayout>
  );
}