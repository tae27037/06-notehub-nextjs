import Link from "next/link";
import css from "./NoteList.module.css";
import type { Note } from "@/types/note";

type Props = {
  notes: Note[];
  onDelete?: (id: string) => void;
};

export default function NoteList({ notes, onDelete }: Props) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.tag}>{note.tag}</p>

          <div className={css.actions}>
            <Link className={css.detailsLink} href={`/notes/${note.id}`}>
              View details
            </Link>

            {onDelete && (
              <button
                className={css.deleteBtn}
                type="button"
                onClick={() => onDelete(note.id)}
              >
                Delete
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
