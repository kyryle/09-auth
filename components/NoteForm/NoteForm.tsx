import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { createNote } from "../../lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useCreateDraft } from "@/lib/store/noteStore";

type TagType = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping"

interface FormValues {
  title: string;
  content: string;
  tag: TagType
}


export default function NoteForm() {
  const queryClient = useQueryClient()

  const route = useRouter()

  const draft = useCreateDraft((state) => state.draft)
  const setDraft = useCreateDraft((state) => state.setDraft)
  const clearDraft = useCreateDraft((state) => state.clearDraft)

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["noteQuery"] })
      route.push("/notes/filter/all")
      clearDraft()
    },
    onError(err) {
      console.log(err);
  alert("something went wrong")
}
  })
  const handleSubmit = (formData: FormData) => {
    const values: FormValues = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as TagType
    }
    
    mutate( values )
  }

  const handleCancelClick = () => {
    route.push("/notes/filter/all")
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    })
  }



  return (
      
        
        <form className={css.form} action={handleSubmit}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
            <input id="title" type="text" name="title" className={css.input} value={draft?.title} onChange={handleChange}/>
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
      <textarea
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
      value={draft?.content}
      onChange={handleChange}
            />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <select id="tag" name="tag" className={css.select} value={draft?.tag} onChange={handleChange}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={handleCancelClick}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled={isPending}
    >
      Create note
    </button>
  </div>
      </form>

  )
}