import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";

type Props = {
  initialValue?: string;
  title?: string;
  onSave: (text: string) => void;
  onCancel: () => void;
};

export default function NoteEditor({
  initialValue = "",
  title = "New Note",
  onSave,
  onCancel,
}: Props) {
  const [text, setText] = useState(initialValue);

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  function handleSave() {
    const value = text.trim();

    if (!value) return;

    onSave(value);
  }

  return (
    <div className="mb-6 rounded-xl border border-slate-700 bg-slate-900 p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-300">
        {title}
      </h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your note..."
        className="min-h-[140px] w-full resize-none rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-white outline-none transition focus:border-blue-500"
      />

      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm transition hover:bg-slate-800"
        >
          <X size={16} />
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm transition hover:bg-blue-700"
        >
          <Save size={16} />
          Save
        </button>
      </div>
    </div>
  );
}