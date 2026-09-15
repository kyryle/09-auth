import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import QueryProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

interface RootLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"], 
  display: "auto",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "App for creating, deleting and checking different notes, grouped by tags",
  metadataBase: new URL("https://notehub.com/"),
  openGraph: {
    title: "NoteHub",
    description: "App for creating, deleting and checking different notes, grouped by tags",
    url: "https://notehub.com/",
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

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      
      <body className={`${roboto.variable}`}>
        <QueryProvider>
          <AuthProvider>
          <Header />
          {children}
          {modal}
          <Footer />
          </AuthProvider>
          </QueryProvider>
      
      </body>
    </html>
  );
}
