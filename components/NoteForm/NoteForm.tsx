"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api/notes";
import type { CreateNotePayload, NoteTag } from "@/types/note";

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Idea", "Other"];

export default function NoteForm() {
  const qc = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<NoteTag>("Other");

  const mutation = useMutation({
    mutationFn: (payload: CreateNotePayload) => createNote(payload),
    onSuccess: () => {
      setTitle("");
      setContent("");
      setTag("Other");
      qc.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, content, tag });
  };

  return (
    <form className={css.form} onSubmit={onSubmit}>
      <input
        className={css.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />

      <textarea
        className={css.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />

      <select
        className={css.select}
        value={tag}
        onChange={(e) => setTag(e.target.value as NoteTag)}
      >
        {tags.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <button
        className={css.button}
        type="submit"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Creating..." : "Create note"}
      </button>
    </form>
  );
}
