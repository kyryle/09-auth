"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfilePage.module.css"
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { updateMe } from "@/lib/clientApi";

const EditPage = () => {
    const route = useRouter()
  const user = useAuthStore((state) => state.user);
//   const setUser = useAuthStore((state) => state.setUser);

    const handleSubmit = async (data: FormData) => {
        console.log(data);
        
        // const username = data.get("username")
        // const check = {...user, userName: username}
        // setUser(check)
        // updateMe(data)
        route.push('/profile')
    }
return (
<main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <Image src="avatar"
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />

    <form className={css.profileInfo} action={handleSubmit}>
      <div className={css.usernameWrapper}>
                <label htmlFor="username">Username: {user?.userName}</label>
        <input id="username"
          type="text"
          className={css.input}
        />
      </div>

            <p>Email: {user?.email}</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" className={css.cancelButton} onClick={() => route.push('/profile')}>
          Cancel
        </button>
      </div>
    </form>
  </div>
    </main>
)
}
export default EditPage;