import { Note } from "@/types/note";

const STORAGE_KEY = "tubeos_notes";

export async function getStorageNotes(): Promise<Note[]> {
  return new Promise((resolve) => {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      resolve(result[STORAGE_KEY] ?? []);
    });
  });
}

export async function setStorageNotes(notes: Note[]): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set(
      {
        [STORAGE_KEY]: notes,
      },
      () => resolve()
    );
  });
}