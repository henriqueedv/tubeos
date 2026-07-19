import {
  NotebookPen,
  Focus,
  LayoutDashboard,
  Settings,
} from "lucide-react";

import Header from "@/components/Header/Header";
import FeatureCard from "@/components/FeatureCard/FeatureCard";
import { useNavigation } from "@/context/NavigationContext";

export default function Home() {
  const { navigate } = useNavigation();

  return (
    <main className="min-h-[500px] bg-slate-950 p-5">
      <Header
        title="TubeOS"
        subtitle="Study smarter on YouTube."
      />

      <div className="space-y-3">
        <FeatureCard
          icon={<NotebookPen size={22} />}
          title="Smart Notes"
          description="Capture notes linked to the exact video timestamp."
          badge="Core"
          onClick={() => navigate("smart-notes")}
        />

        <FeatureCard
          icon={<Focus size={22} />}
          title="Focus Mode"
          description="Hide distractions and stay focused while studying."
          onClick={() => navigate("focus-mode")}
        />

        <FeatureCard
          icon={<LayoutDashboard size={22} />}
          title="Dashboard"
          description="Track your study sessions and learning progress."
          badge="Soon"
          onClick={() => navigate("dashboard")}
        />

        <FeatureCard
          icon={<Settings size={22} />}
          title="Settings"
          description="Customize TubeOS your way."
          onClick={() => navigate("settings")}
        />
      </div>

      <footer className="mt-6 border-t border-slate-800 pt-4 text-center text-xs text-slate-500">
        TubeOS v0.1.0
      </footer>
    </main>
  );
}