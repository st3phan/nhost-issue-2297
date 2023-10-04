import { useSignOut, useAuthenticationStatus } from '@nhost/nextjs'

import { useRouter } from 'next/router';
import {useEffect} from 'react';

export default function Signout() {
  const { signOut } = useSignOut()
  const { isLoading, isAuthenticated } = useAuthenticationStatus()

  const router = useRouter();

  const handleSignout = async () => {
    await signOut();
    router.push(`/`);
  };


  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <>
      <h1>Sign out</h1>
      {isLoading && 'Signing out...'}
      {isAuthenticated && <button onClick={handleSignout}>Sign out</button>}
    </>
  )
}
