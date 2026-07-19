import { Note } from "@/types/note";

export async function getNotes(): Promise<Note[]> {
  return [];
}

export async function saveNote(note: Note): Promise<void> {}

export async function deleteNote(id: string): Promise<void> {}

export async function updateNote(note: Note): Promise<void> {}