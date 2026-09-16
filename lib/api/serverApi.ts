import { User } from "@/types/user";
import type { Note, NoteId } from "../../types/note"
import { nextApi } from "./api";
import { cookies } from 'next/headers';

export interface NoteHubResponse {
    notes: Note[],
    totalPages: number,
}

export const checkServerSession = async () => {
    
    const cookieStore = await cookies();
    
  const res = await nextApi.get('/auth/session', {
      headers: {
      Cookie: cookieStore.toString(),
    },
  });
    
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextApi.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNotes = async (search: string, page: number, tag: string) => {
    try {
        const result = await nextApi.get<NoteHubResponse>('/notes', {
            params: {
                search: search,
                page: page,
                ...(tag && {tag}),
            },
            headers: {
                Cookie: cookieStore.toString(),
            }

        })
        
        return result.data

    } catch (err) {
        console.log(err);
        return (
            {
                notes: [],
                totalPages: 0
            }
        )

    }

}

export const fetchNoteById = async (id: NoteId) => {
    try {
    const result = await nextApi.get<Note>(`/notes/${id}`, {
            headers: {
                Cookie: cookieStore.toString(),
            }
    })
    
    return result.data
    

} catch (err) {
        console.log(err);
        throw err
    }
}