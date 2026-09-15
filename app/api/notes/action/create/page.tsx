import css from "./CreateNote.module.css"
import CreateNoteClient from "./CreateNote.client"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create note",
  description: "Create note on NoteHub",
  metadataBase: new URL("https://notehub.com/"),
  openGraph: {
    title: "Create note",
    description: "Create note on NoteHub",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "NoteHub image",
        width: 600,
        height: 300
      }
    ]
  }
};

export default function CreateNote() {

    

    return (
        <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	   <CreateNoteClient/>
  </div>
</main>

    )
}