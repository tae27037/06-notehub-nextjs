"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteNote, fetchNotes } from "@/lib/api/notes";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";

export default function NotesClient() {
  const qc = useQueryClient();

  const [search, setSearch] = useState("");
  const [page] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", { page, search }],
    queryFn: () => fetchNotes({ page, search }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notes"] }),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <main>
      <SearchBox value={search} onChange={setSearch} />
      <NoteForm />
      <NoteList
        notes={data?.notes ?? []}
        onDelete={(id) => deleteMutation.mutate(id)}
      />
    </main>
  );
}
