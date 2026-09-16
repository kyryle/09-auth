import { LoginRequest, RegisterRequest, User } from "@/types/user";
import type { Note, NoteData, NoteId } from "../../types/note"
import { nextApi } from "./api";


export interface NoteHubResponse {
    notes: Note[],
    totalPages: number,
}

interface CheckSessionResponse {
  success: boolean;
};

interface UserData {
  username: string,
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

export const checkSession = async (): Promise<CheckSessionResponse> => {
  const res = await nextApi.get<CheckSessionResponse>('/auth/session');
  return res.data;
};

export const getMe = async () => {
  const { data } = await nextApi.get<User>('/users/me');
  return data;
};

export const updateMe = async (data: UserData) => {
    const res = await nextApi.patch<User>('/users/me', data);
  return res.data;
};

export const fetchNotes = async (search: string, page: number, tag: string) => {
    try {
        const result = await nextApi.get<NoteHubResponse>('/notes', {
            params: {
                search: search,
                page: page,
                ...(tag && {tag}),
            }
        })
        
        return result.data

    } catch (err) {
        console.log(err);
    }

}

export const createNote = async (data: NoteData) => {
    try {
    const result = await nextApi.post<Note>(`/notes`, data)
    return result.data

} catch (err) {
        console.log(err);
        throw err

    }
}

export const deleteNote = async (id: NoteId) => {
    try {
    const result = await nextApi.delete<Note>(`/notes/${id}`)
    return result.data

} catch (err) {
        console.log(err);
        throw err

    }
}

export const fetchNoteById = async (id: NoteId) => {
    try {
    const result = await nextApi.get<Note>(`/notes/${id}`)
    
    return result.data
    

} catch (err) {
        console.log(err);
        throw err
    }
}