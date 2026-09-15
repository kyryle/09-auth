export interface Note {
      id: string,
      title: string,
      content: string,
      createdAt: string,
      updatedAt: string,
      tag: string,
}

export type NoteId = Note["id"]

export type NewNote = {
      title: string,
      content: string,
      tag: string
}

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type CheckSessionRequest = {
  success: boolean;
};

export interface UserData {
  email: string,
  userName: string,
}