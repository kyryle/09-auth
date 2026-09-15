'use client';

import css from "./notesPage.module.css"
import NoteList from "../../../../../components/NoteList/NoteList";
import Pagination from "../../../../../components/Pagination/Pagination";
import SearchBox from "../../../../../components/SearchBox/SearchBox";
import { fetchNotes } from "../../../../../lib/api/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { Note } from "../../../../../types/note"
import { useRouter } from "next/navigation";


interface NotesClientProps {
    tag: string
}

export default function NotesClient({ tag }: NotesClientProps) {
    const route = useRouter()

    const [searchValue, setSearchValue] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const { data } = useQuery({
        queryKey: ["noteQuery", searchValue, page, tag],
        queryFn: () => fetchNotes(searchValue, page, tag),
        placeholderData: keepPreviousData,
    })

    const onSearch = (value: string) => {
        setSearchValue(value)
        setPage(1)
    }

    const debouncedOnSearch = useDebouncedCallback(onSearch, 1000)

    const handlePage = (page: number) => {
        setPage(page)
    }

    const handleClick = () => {
        route.push('/notes/action/create')
    }


    const results: Note[] = data?.notes ?? []
    const totalPages = data?.totalPages ?? 0

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox searchValue={searchValue} onSearch={debouncedOnSearch} />
                {totalPages > 1 && <Pagination totalPages={totalPages} onPageChange={handlePage} forcePage={page} />}
                <button className={css.button} onClick={handleClick}>Create note +</button>
            </header>
            {results.length > 0 && <NoteList notes={results} />}
        </div>
    )
}