import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";

type Props = {
  initialTitle?: string;
  initialContent?: string;
  initialTags?: string[];

  title?: string;

  onSave: (
    title: string,
    content: string,
    tags: string[]
  ) => void;

  onCancel: () => void;
};

export default function NoteEditor({
  initialTitle = "",
  initialContent = "",
  initialTags = [],

  title = "New Note",

  onSave,
  onCancel,
}: Props) {
  const [noteTitle, setNoteTitle] =
    useState(initialTitle);

  const [content, setContent] =
    useState(initialContent);

  const [tags, setTags] = useState(
    initialTags.join(", ")
  );

  useEffect(() => {
    setNoteTitle(initialTitle);
    setContent(initialContent);
    setTags(initialTags.join(", "));
  }, [
    initialTitle,
    initialContent,
    initialTags,
  ]);

  function handleSave() {
    const finalTitle = noteTitle.trim();
    const finalContent = content.trim();

    if (!finalContent) return;

    const parsedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    onSave(
      finalTitle || "Untitled Note",
      finalContent,
      parsedTags
    );
  }

  return (
    <div className="mb-6 rounded-xl border border-slate-700 bg-slate-900 p-4">
      <h3 className="mb-4 text-sm font-semibold text-slate-300">
        {title}
      </h3>

      <input
        value={noteTitle}
        onChange={(e) =>
          setNoteTitle(e.target.value)
        }
        placeholder="Title"
        className="mb-3 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-white outline-none transition focus:border-blue-500"
      />

      <textarea
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        placeholder="Write your note..."
        className="min-h-[160px] w-full resize-none rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-white outline-none transition focus:border-blue-500"
      />

      <input
        value={tags}
        onChange={(e) =>
          setTags(e.target.value)
        }
        placeholder="Tags (react, javascript, frontend)"
        className="mt-3 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-white outline-none transition focus:border-blue-500"
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