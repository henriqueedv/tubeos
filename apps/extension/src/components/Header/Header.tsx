type HeaderProps = {
  title: string;
  subtitle: string;
};

export default function Header({
  title,
  subtitle,
}: HeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-2xl shadow-lg">
          🚀
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white">
            {title}
          </h1>

          <p className="text-sm text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>
    </header>
  );
}