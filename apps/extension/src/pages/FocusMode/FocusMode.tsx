import { useState } from "react";
import {
  ArrowLeft,
  Focus,
  EyeOff,
  MessageSquareOff,
  LayoutDashboard,
  Home,
  Radio,
} from "lucide-react";

import { useNavigation } from "@/context/NavigationContext";

export default function FocusMode() {
  const { navigate } = useNavigation();

  const [focusEnabled, setFocusEnabled] = useState(false);
  const [hideShorts, setHideShorts] = useState(true);
  const [hideRecommendations, setHideRecommendations] =
    useState(true);
  const [hideComments, setHideComments] = useState(false);
  const [hideHomeFeed, setHideHomeFeed] = useState(false);
  const [hideLiveChat, setHideLiveChat] = useState(false);

  function Toggle({
    title,
    subtitle,
    icon,
    checked,
    onChange,
  }: {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    checked: boolean;
    onChange: () => void;
  }) {
    return (
      <button
        onClick={onChange}
        className="flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-900 p-4 transition hover:border-blue-500"
      >
        <div className="flex items-center gap-4">
          <div className="text-blue-400">
            {icon}
          </div>

          <div className="text-left">
            <h3 className="font-semibold">
              {title}
            </h3>

            <p className="text-sm text-slate-400">
              {subtitle}
            </p>
          </div>
        </div>

        <div
          className={`h-6 w-11 rounded-full transition ${
            checked
              ? "bg-blue-600"
              : "bg-slate-700"
          }`}
        >
          <div
            className={`mt-0.5 h-5 w-5 rounded-full bg-white transition ${
              checked
                ? "translate-x-5"
                : "translate-x-0.5"
            }`}
          />
        </div>
      </button>
    );
  }

  return (
    <main className="min-h-[500px] bg-slate-950 p-5 text-white">
      <button
        onClick={() => navigate("home")}
        className="mb-6 flex items-center gap-2 text-slate-400 transition hover:text-white"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="mb-6 flex items-center gap-3">
        <Focus
          className="text-blue-400"
          size={28}
        />

        <div>
          <h1 className="text-2xl font-bold">
            Focus Mode
          </h1>

          <p className="text-sm text-slate-400">
            Remove distractions while studying.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <Toggle
          title="Enable Focus Mode"
          subtitle="Master switch"
          icon={<Focus size={22} />}
          checked={focusEnabled}
          onChange={() =>
            setFocusEnabled(!focusEnabled)
          }
        />

        <Toggle
          title="Hide Shorts"
          subtitle="Remove Shorts section"
          icon={<EyeOff size={22} />}
          checked={hideShorts}
          onChange={() =>
            setHideShorts(!hideShorts)
          }
        />

        <Toggle
          title="Hide Recommendations"
          subtitle="Hide suggested videos"
          icon={<LayoutDashboard size={22} />}
          checked={hideRecommendations}
          onChange={() =>
            setHideRecommendations(
              !hideRecommendations
            )
          }
        />

        <Toggle
          title="Hide Comments"
          subtitle="Hide comments section"
          icon={<MessageSquareOff size={22} />}
          checked={hideComments}
          onChange={() =>
            setHideComments(!hideComments)
          }
        />

        <Toggle
          title="Hide Home Feed"
          subtitle="Remove homepage feed"
          icon={<Home size={22} />}
          checked={hideHomeFeed}
          onChange={() =>
            setHideHomeFeed(!hideHomeFeed)
          }
        />

        <Toggle
          title="Hide Live Chat"
          subtitle="Hide live chat"
          icon={<Radio size={22} />}
          checked={hideLiveChat}
          onChange={() =>
            setHideLiveChat(!hideLiveChat)
          }
        />
      </div>
    </main>
  );
}