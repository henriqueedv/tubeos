import { Note } from "@/types/note";
import {
  getStorageNotes,
  setStorageNotes,
} from "./storage.service";

export async function getNotes(): Promise<Note[]> {
  return await getStorageNotes();
}

export async function saveNote(note: Note): Promise<void> {
  const notes = await getStorageNotes();

  notes.unshift(note);

  await setStorageNotes(notes);
}

export async function deleteNote(id: string): Promise<void> {
  const notes = await getStorageNotes();

  await setStorageNotes(
    notes.filter((note) => note.id !== id)
  );
}

export async function updateNote(updated: Note): Promise<void> {
  const notes = await getStorageNotes();

  const newNotes = notes.map((note) =>
    note.id === updated.id ? updated : note
  );

  await setStorageNotes(newNotes);
}