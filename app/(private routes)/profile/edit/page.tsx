"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfilePage.module.css"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { updateMe } from "@/lib/api/clientApi";

const EditPage = () => {
    const route = useRouter()
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (data: FormData) => {
    const newUser = {
      ...user,
      username: data.get("username") as string,
      email: user?.email || "",
      avatar: user?.avatar || "",
    }
        setUser(newUser)
        await updateMe(newUser)
        route.back()
    }
return (
<main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

      {user?.avatar && (
        <Image src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />)}

    <form className={css.profileInfo} action={handleSubmit}>
      <div className={css.usernameWrapper}>
                <label htmlFor="username">Username: {user?.username}</label>
          <input id="username"
            name="username"
          type="text"
            className={css.input}
            placeholder={user?.username}
        />
      </div>

            <p>Email: {user?.email}</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" className={css.cancelButton} onClick={() => route.back()}>
          Cancel
        </button>
      </div>
    </form>
  </div>
    </main>
)
}
export default EditPage;