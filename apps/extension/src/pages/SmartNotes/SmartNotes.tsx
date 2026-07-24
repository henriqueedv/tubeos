import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  NotebookPen,
  Plus,
  Play,
  Pencil,
  Trash2,
  Star,
  Search,
} from "lucide-react";

import { useNavigation } from "@/context/NavigationContext";

import {
  getNotes,
  saveNote,
  deleteNote,
  updateNote,
} from "@/services/notes.service";

import {
  getCurrentVideo,
  CurrentVideo,
} from "@/services/youtube.service";

import { openVideoAtTime } from "@/services/navigation.service";

import { generate } from "@/services/flashcards.service";

import { Note } from "@/types/note";

import NoteEditor from "@/components/NoteEditor/NoteEditor";

export default function SmartNotes() {
  const { navigate } = useNavigation();

  const [notes, setNotes] = useState<Note[]>([]);
  const [video, setVideo] =
    useState<CurrentVideo | null>(null);

  const [search, setSearch] = useState("");

  const [editorOpen, setEditorOpen] =
    useState(false);

  const [editingNote, setEditingNote] =
    useState<Note | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [notesData, videoData] =
      await Promise.all([
        getNotes(),
        getCurrentVideo(),
      ]);

    const normalizedNotes = notesData.map(
      (note) => ({
        ...note,
        title:
          note.title ?? "Untitled Note",
        content: note.content ?? "",
        favorite:
          note.favorite ?? false,
        tags: note.tags ?? [],
        updatedAt:
          note.updatedAt ??
          note.createdAt,
      })
    );

    setNotes(normalizedNotes);
    setVideo(videoData);
  }

  async function handleSave(
    title: string,
    content: string,
    tags: string[]
  ) {
    if (editingNote) {
      await updateNote({
        ...editingNote,
        title,
        content,
        tags,
        updatedAt: Date.now(),
      });
    } else {
      if (!video) return;

      const note: Note = {
        id: crypto.randomUUID(),
        title,
        content,
        videoId: video.videoId ?? "",
        videoTitle: video.title,
        timestamp: video.timestamp,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        favorite: false,
        tags,
      };

      await saveNote(note);
    }

    setEditorOpen(false);
    setEditingNote(null);

    loadData();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this note?")) return;

    await deleteNote(id);

    loadData();
  }

  function handleEdit(note: Note) {
    setEditingNote(note);
    setEditorOpen(true);
  }

  async function toggleFavorite(
    note: Note
  ) {
    await updateNote({
      ...note,
      favorite: !note.favorite,
      updatedAt: Date.now(),
    });

    loadData();
  }

  async function handleGenerate(note: Note) {
  const cards = await generate(note);

  await updateNote({
    ...note,
    flashcards: cards,
    updatedAt: Date.now(),
  });

  loadData();
}

  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) => {
        const term =
          search.toLowerCase();

        return (
          note.title
            .toLowerCase()
            .includes(term) ||
          note.content
            .toLowerCase()
            .includes(term) ||
          note.videoTitle
            .toLowerCase()
            .includes(term)
        );
      })
      .sort((a, b) => {
        const aFavorite =
          a.favorite ?? false;

        const bFavorite =
          b.favorite ?? false;

        if (
          aFavorite !== bFavorite
        ) {
          return aFavorite ? -1 : 1;
        }

        return (
          b.createdAt -
          a.createdAt
        );
      });

  }, [notes, search]);

  return (

    <main className="min-h-[500px] bg-slate-950 p-5 text-white">
  <button
    onClick={() => navigate("home")}
    className="mb-6 flex items-center gap-2 text-slate-400 transition hover:text-white"
  >
    <ArrowLeft size={18} />
    Back
  </button>

  <div className="mb-6 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <NotebookPen
        size={28}
        className="text-blue-400"
      />

      <div>
        <h1 className="text-2xl font-bold">
          Smart Notes
        </h1>

        <p className="text-sm text-slate-400">
          Your study notes
        </p>
      </div>
    </div>

    <button
      onClick={() => {
        setEditingNote(null);
        setEditorOpen(true);
      }}
      className="rounded-lg bg-blue-600 p-2 transition hover:bg-blue-700"
    >
      <Plus size={18} />
    </button>
  </div>

  <div className="relative mb-6">
    <Search
      size={18}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
    />

    <input
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      placeholder="Search notes..."
      className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-blue-500"
    />
  </div>

  {video && (
    <div className="mb-6 rounded-xl border border-slate-700 bg-slate-900 p-4">
      <div className="mb-2 flex items-center gap-2">
        <Play
          size={18}
          className="text-red-500"
        />

        <span className="text-sm font-semibold">
          Current Video
        </span>
      </div>

      <h2 className="font-semibold">
        {video.title}
      </h2>

      <div className="mt-3 text-sm text-slate-400">
        Current position: {video.timestamp}s
      </div>
    </div>
  )}

{editorOpen && (
  <NoteEditor
    title={
      editingNote
        ? "Edit Note"
        : "New Note"
    }
    initialTitle={
      editingNote?.title ?? ""
    }
    initialContent={
      editingNote?.content ?? ""
    }
    initialTags={
      editingNote?.tags ?? []
    }
    onSave={handleSave}
    onCancel={() => {
      setEditorOpen(false);
      setEditingNote(null);
    }}
  />
)}

  {filteredNotes.length === 0 ? (
    <div className="rounded-xl border border-slate-700 p-6 text-center">
      <NotebookPen
        size={40}
        className="mx-auto mb-3 text-slate-500"
      />

      <h2 className="mb-2 text-lg font-semibold">
        No notes found
      </h2>

      <p className="text-sm text-slate-400">
        Create a new note or change your search.
      </p>
    </div>
  ) : (
    <div className="space-y-4">
      {filteredNotes.map((note) => (
        <div
          key={note.id}
          className="rounded-xl border border-slate-700 bg-slate-900 p-4"
        >
          <div className="flex items-start justify-between gap-4">

            <div className="flex-1">

              <div className="flex items-center gap-2">

                <h3 className="font-semibold">
                  {note.title}
                </h3>

                {note.favorite && (
                  <Star
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                )}

              </div>

              <p className="mt-1 text-xs text-slate-500">
                {note.videoTitle}
              </p>

              <div className="mt-2 flex items-center gap-3 text-xs">

                <button
                  onClick={() =>
                    openVideoAtTime(
                      note.videoId,
                      note.timestamp
                    )
                  }
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-blue-400 transition hover:bg-slate-800"
                >
                  <Play size={13} />

                  {`${Math.floor(
                    note.timestamp / 60
                  )}:${String(
                    note.timestamp % 60
                  ).padStart(2, "0")}`}
                </button>

                <span className="text-slate-500">
                  •
                </span>

                <span className="text-slate-500">
                  {new Date(
                    note.createdAt
                  ).toLocaleDateString()}
                </span>

              </div>

            </div>

            <div className="flex gap-2">

              <button
                onClick={() =>
                  toggleFavorite(note)
                }
                className="rounded-md p-2 transition hover:bg-slate-800"
              >
                <Star
                  size={16}
                  className={
                    note.favorite
                      ? "fill-yellow-400 text-yellow-400"
                      : ""
                  }
                />
              </button>

              <button
                onClick={() =>
                  handleEdit(note)
                }
                className="rounded-md p-2 transition hover:bg-slate-800"
              >
                <Pencil size={16} />
              </button>


              <button
  onClick={() => handleGenerate(note)}
  className="rounded-md p-2 transition hover:bg-slate-800"
  title="Generate Flashcards"
>
  🧠
</button>

              <button
                onClick={() =>
                  handleDelete(note.id)
                }
                className="rounded-md p-2 text-red-400 transition hover:bg-slate-800"
              >
                <Trash2 size={16} />
              </button>

            </div>

          </div>          <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-300">
            {note.content}
          </p>

                    {note.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

                    {/* Flashcards */}
          {note.flashcards &&
            note.flashcards.length > 0 && (
              <div className="mt-5 border-t border-slate-700 pt-4">

                <h4 className="mb-3 flex items-center gap-2 font-semibold text-blue-300">
                  🧠 Flashcards
                </h4>

                <div className="space-y-3">
                  {note.flashcards.map((card, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-slate-700 bg-slate-950 p-3"
                    >
                      <p className="font-semibold text-white">
                        {card.question}
                      </p>

                      <p className="mt-2 text-sm text-slate-300">
                        {card.answer}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
          )}

        </div>
      ))}
    </div>
  )}
</main>
  );
}