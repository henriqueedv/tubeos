import { Flashcard } from "@/types/flashcard";

export async function generateFlashcards(
  noteId: string,
  content: string
): Promise<Flashcard[]> {

  const sentences = content
    .split(".")
    .map(s => s.trim())
    .filter(Boolean);

  return sentences.map(sentence => ({

    id: crypto.randomUUID(),

    noteId,

    question: "What does this mean?",

    answer: sentence,

    createdAt: Date.now(),

  }));

}