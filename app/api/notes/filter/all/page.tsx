import { fetchNotes } from "@/lib/serverApi";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

export default async function NotesByTags() {

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
            queryKey: ["noteQuery", {search: "", page: 1}],
            queryFn: () => fetchNotes("", 1, ""),
    
    })
    
    
    return (

        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient />
        </HydrationBoundary>
        
    )
}
