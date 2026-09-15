import { NewNote } from "@/types/note";
import { create } from "zustand"
import { persist } from 'zustand/middleware'

interface Draft {
  draft: NewNote,
  setDraft: (note: NewNote) => void,
  clearDraft: () => void,
}

const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useCreateDraft = create<Draft>()(
  persist((set) => {
  return {
    draft: initialDraft,
    setDraft: (note) => {
      set({draft: note})
    },
    clearDraft: () => {
      set({draft: initialDraft})
    },
  }
  }, {
    name: "NoteDraft", partialize: (state) => {
      return {
        draft: state.draft
      }
    } 
  },
  )
)



