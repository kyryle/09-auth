import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/serverApi"
import NoteDetails from "./NoteDetails.client"
import type { Metadata } from "next";

export async function generateMetadata({ params }: SingleNoteDetailsProps): Promise<Metadata> {
    const { id } = await params

    const data = await fetchNoteById(id)

    return {
        title: `${data.title}`,
        description: `${data.content}`,
        metadataBase: new URL("https://notehub.com/"),
        openGraph: {
            title: `${data.title}`,
            description: `${data.content}`,
            url: `/notes/${data.id}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    alt: "NoteHub image",
                    width: 600,
                    height: 300
                }
            ]
        }
    }
};

interface SingleNoteDetailsProps {
    params: Promise<{id: string}>
}

export default async function SingleNoteDetails({ params }: SingleNoteDetailsProps) {
    const { id } = await params 

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["singleNote", id],
        queryFn: () => fetchNoteById(id),

    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetails id={id}/>
        </HydrationBoundary>
            )
}