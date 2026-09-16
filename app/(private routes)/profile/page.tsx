
import css from "./ProfilePage.module.css"
import { getServerMe } from '@/lib/api/serverApi';
import { Metadata } from "next";
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "NoteHub profile",
  description: "User's profile on NoteHub",
  metadataBase: new URL("https://notehub-api.goit.study/"),
  openGraph: {
    title: "NoteHub profile",
    description: "User's profile on NoteHub",
    url: "https://notehub-api.goit.study/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "NoteHub image",
        width: 600,
        height: 300
      }
    ]
  }
};

const Profile = async () => {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <Link href="/profile/edit" className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     <div className={css.avatarWrapper}>
      <Image
        src={user.avatar}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: {user.username}
      </p>
      <p>
        Email: {user.email}
      </p>
    </div>
  </div>
</main>
    // <section>
    //   <div>
    //     <h1>My Profile</h1>
    //     <Link href="/profile/edit">Edit profile</Link>
    //   </div>
    //   <div>
    //     <h2>Name: {user.username}</h2>
    //     <h2>Email: {user.email}</h2>
    //     <p>
    //       Some description: Lorem ipsum dolor sit amet consectetur adipisicing elit...
    //     </p>
    //   </div>
    // </section>
  );
};

export default Profile;
