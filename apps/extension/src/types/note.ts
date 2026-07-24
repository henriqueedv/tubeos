export interface Flashcard {
  question: string;
  answer: string;
}

export type Note = {
  id: string;

  title: string;

  content: string;

  videoId: string;

  videoTitle: string;

  timestamp: number;

  createdAt: number;

  updatedAt: number;

  favorite: boolean;

  tags: string[];

  flashcards?: Flashcard[];
};