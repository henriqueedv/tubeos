import { useEffect, useState } from "react";
import {
  ArrowLeft,
  NotebookPen,
  Plus,
  Play,
  Clock3,
  Pencil,
  Trash2,
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

import { Note } from "@/types/note";

import NoteEditor from "@/components/NoteEditor/NoteEditor";

export default function SmartNotes() {
  const { navigate } = useNavigation();

  const [notes, setNotes] = useState<Note[]>([]);
  const [video, setVideo] = useState<CurrentVideo | null>(null);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingNote, setEditingNote] =
    useState<Note | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [notesData, videoData] = await Promise.all([
      getNotes(),
      getCurrentVideo(),
    ]);

    setNotes(notesData);
    setVideo(videoData);
  }

  async function handleSave(text: string) {
    if (editingNote) {
      await updateNote({
        ...editingNote,
        text,
      });
    } else {
      if (!video) return;

      const note: Note = {
        id: crypto.randomUUID(),
        videoId: video.videoId ?? "",
        videoTitle: video.title,
        timestamp: video.timestamp,
        text,
        createdAt: Date.now(),
      };

      await saveNote(note);
    }

    setEditorOpen(false);
    setEditingNote(null);

    loadData();
  }

  async function handleDelete(id: string) {
    const confirmed = confirm(
      "Delete this note?"
    );

    if (!confirmed) return;

    await deleteNote(id);

    loadData();
  }

  function handleEdit(note: Note) {
    setEditingNote(note);
    setEditorOpen(true);
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

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
            <Clock3 size={15} />

            <span>{video.timestamp}s</span>
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
          initialValue={
            editingNote?.text ?? ""
          }
          onSave={handleSave}
          onCancel={() => {
            setEditorOpen(false);
            setEditingNote(null);
          }}
        />
      )}

      {notes.length === 0 ? (
        <div className="rounded-xl border border-slate-700 p-6 text-center">
          <NotebookPen
            size={40}
            className="mx-auto mb-3 text-slate-500"
          />

          <h2 className="mb-2 text-lg font-semibold">
            No notes yet
          </h2>

          <p className="text-sm text-slate-400">
            Create your first note while watching YouTube.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-xl border border-slate-700 bg-slate-900 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">
                    {note.videoTitle}
                  </h3>

                  <span className="text-xs text-slate-500">
                    {note.timestamp}s
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(note)}
                    className="rounded-md p-2 transition hover:bg-slate-800"
                  >
                    <Pencil size={16} />
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
              </div>

              <p className="mt-3 whitespace-pre-wrap text-sm text-slate-300">
                {note.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}