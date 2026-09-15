'use client'

import Link from 'next/link'
import { useAuthStore } from '@/lib/store/authStore'
import { logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';


const AuthNavigation = () => {
    
    const router = useRouter()
    
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();

    const handleLogout = async () => {
      
        await logout();
        
        clearIsAuthenticated();
        
    router.push('/sign-in');
  };

    return isAuthenticated ? (
        <>
      <li>
	      <Link href="/profile">Profile</Link>
      </li>
    <li>
      <p>{user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </li>
    </>
  ) : (
    <>
      <li>
	      <Link href="/auth/sign-in">Login</Link>
      </li>
      <li>
	      <Link href="/auth/sign-up">Sign up</Link>
	    </li>
    </>
  );
};

export default AuthNavigation;
