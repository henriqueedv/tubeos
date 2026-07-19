import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { useNavigation } from "@/context/NavigationContext";

export default function Dashboard() {
  const { navigate } = useNavigation();

  return (
    <main className="min-h-[500px] bg-slate-950 p-5 text-white">
      <button
        onClick={() => navigate("home")}
        className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="flex items-center gap-3">
        <LayoutDashboard className="text-blue-400" size={28} />
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <p className="mt-4 text-slate-400">
        Track your learning progress and study sessions.
      </p>
    </main>
  );
}