import { Note } from "@/types/note";

export interface Flashcard {
  question: string;
  answer: string;
}

export async function generate(
  note: Note
): Promise<Flashcard[]> {
  const paragraphs = note.content
    .split("\n")
    .filter((p) => p.trim().length > 20);

  const cards = paragraphs.slice(0, 10).map((text) => ({
    question: "What does this note explain?",
    answer: text.trim(),
  }));

  return cards;
}