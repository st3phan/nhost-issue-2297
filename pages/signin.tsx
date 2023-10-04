import { useAuthenticationStatus, useSignInEmailPassword } from '@nhost/nextjs';
import { useRouter } from 'next/router';

export default function Home() {
  const { signInEmailPassword, isLoading, isSuccess, needsEmailVerification, isError, error } =
    useSignInEmailPassword();

  const { isLoading: isLoadingAuth, isAuthenticated } = useAuthenticationStatus();

  const router = useRouter();

  const handleLogin = async () => {
    await signInEmailPassword('[EMAIL]', '[PASSWORD]')
    await router.push('/');
  }

  if (isLoadingAuth) {
    return 'loading...'
  }

  if (isAuthenticated){
    router.push('/');
  }

  return (
    <>
      <h1>Sign in</h1>
      {isError && <div>{error}</div>}
      <button onClick={handleLogin}>Sign in</button>
    </>
  )
}
