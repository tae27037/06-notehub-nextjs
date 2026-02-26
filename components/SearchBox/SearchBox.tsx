"use client";

import css from "./SearchBox.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBox({ value, onChange }: Props) {
  return (
    <div className={css.wrapper}>
      <input
        className={css.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search notes..."
      />
    </div>
  );
}
