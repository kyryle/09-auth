import { fetchNotes } from "@/lib/api/serverApi";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesByTagsClient from "./Notes.client";
import type { Metadata } from "next";

export async function generateMetadata({ params }: NotesByTagsProps): Promise<Metadata> {
    const { slug } = await params

    const tag = slug[0]

    return {
        title: `NoteHub-${tag} notes`,
        description: `Notes with ${tag} tag`,
        metadataBase: new URL("https://notehub.com/"),
        openGraph: {
            title: `NoteHub-${tag} notes`,
            description: `Notes with ${tag} tag`,
            url: `/filter/${tag}`,
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

interface NotesByTagsProps {
    params: Promise<{slug: string[]}>
}

export default async function NotesByTags({ params }: NotesByTagsProps) {
    const { slug } = await params

    const tag = slug[0]

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
            queryKey: ["noteQuery", {search: "", page: 1, tag}],
            queryFn: () => fetchNotes("", 1, tag),
    
    })
    
    
    return (

        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesByTagsClient tag={tag}/>
        </HydrationBoundary>
        
    )
}
