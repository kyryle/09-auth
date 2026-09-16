import { LoginRequest, RegisterRequest, User } from "@/types/user";
import type { Note, NoteId } from "../../types/note"
import { nextApi } from "./api";


const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NoteHubResponse {
    notes: Note[],
    totalPages: number,
}

export type CheckSessionRequest = {
  success: boolean;
};

interface NoteData {
    title: string;
    content: string;
    tag: string
}

export interface UserData {
  username: string,
}

export const register = async (data: RegisterRequest) => {
  const res = await nextApi.post<User>('/auth/register', data, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    });
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextApi.post<User>('/auth/login', data, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    });
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextApi.post('/auth/logout', {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    })
};

export const checkSession = async () => {
  const res = await nextApi.get<CheckSessionRequest>('/auth/session', {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    });
  return res.data;
};

export const getMe = async () => {
  const { data } = await nextApi.get<User>('/users/me', {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    });
  return data;
};

export const updateMe = async (data: UserData) => {
    const res = await nextApi.patch<User>('/users/me', data, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    });
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