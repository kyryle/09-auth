import type { CheckSessionRequest, LoginRequest, Note, NoteId, RegisterRequest, User, UserData } from "../types/note"
import { nextApi } from "./api";


const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NoteHubResponse {
    notes: Note[],
    totalPages: number,
}

interface NoteData {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping"
}

export const register = async (data: RegisterRequest) => {
  const res = await nextApi.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextApi.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextApi.post('/auth/logout')
};

export const checkSession = async () => {
  const res = await nextApi.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextApi.get<User>('/auth/me');
  return data;
};

export const updateMe = async (data: UserData) => {
  const res = await nextApi.post<User>('/auth/me', data);
  return res.data;
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
                Authorization: `Bearer ${myKey}`
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

export const createNote = async (data: NoteData) => {
    try {
    const result = await nextApi.post<Note>(`/notes`, data, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    })
    return result.data

} catch (err) {
        console.log(err);
        throw err

    }
}

export const deleteNote = async (id: NoteId) => {
    try {
    const result = await nextApi.delete<Note>(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    })
    return result.data

} catch (err) {
        console.log(err);
        throw err

    }
}

export const fetchNoteById = async (id: NoteId) => {
    try {
    const result = await nextApi.get<Note>(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    })
    
    return result.data
    

} catch (err) {
        console.log(err);
        throw err
    }
}