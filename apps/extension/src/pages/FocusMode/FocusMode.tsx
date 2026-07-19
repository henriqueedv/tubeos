import { ArrowLeft, Focus } from "lucide-react";
import { useNavigation } from "@/context/NavigationContext";

export default function FocusMode() {
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
        <Focus className="text-blue-400" size={28} />
        <h1 className="text-2xl font-bold">Focus Mode</h1>
      </div>

      <p className="mt-4 text-slate-400">
        Remove distractions while watching YouTube videos.
      </p>
    </main>
  );
}