import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
  onClick?: () => void;
};

export default function FeatureCard({
  icon,
  title,
  description,
  badge,
  onClick,
}: FeatureCardProps) {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        rounded-xl
        border
        border-slate-700
        bg-slate-900
        p-4
        text-left
        transition
        duration-200
        hover:border-blue-500
        hover:bg-slate-800
        hover:shadow-lg
      "
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
            {icon}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white">
                {title}
              </h3>

              {badge && (
                <span className="rounded bg-blue-600 px-2 py-1 text-xs text-white">
                  {badge}
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-slate-400">
              {description}
            </p>
          </div>
        </div>

        <ChevronRight className="text-slate-500" size={18} />
      </div>
    </button>
  );
}