import css from "./page.module.css"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description: "Page not found",
  metadataBase: new URL("https://notehub.com/"),
  openGraph: {
    title: "NoteHub",
    description: "App for creating, deleting and checking different notes, grouped by tags",
    url: "/",
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

export default function MissingPage() {
    return (
        <div>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </div>

    )
}