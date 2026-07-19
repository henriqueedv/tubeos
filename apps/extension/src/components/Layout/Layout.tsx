import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="min-h-[500px] bg-slate-950 p-5 text-white">
      {children}
    </main>
  );
}