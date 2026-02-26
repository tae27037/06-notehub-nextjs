import { apiClient } from "./client";
import type { CreateNotePayload, FetchNotesResponse, Note } from "@/types/note";

export type FetchNotesParams = {
  page?: number;
  perPage?: number;
  search?: string;
};

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  const { data } = await apiClient.get<FetchNotesResponse>("/notes", {
    params,
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await apiClient.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const { data } = await apiClient.post<Note>("/notes", payload);
  return data;
}

export async function deleteNote(id: string): Promise<void> {
  await apiClient.delete(`/notes/${id}`);
}
