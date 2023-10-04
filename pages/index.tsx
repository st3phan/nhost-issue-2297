import { useAuthenticationStatus } from '@nhost/nextjs';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';

const GET_CRAFTS = gql`
  query GetCrafts {
    crafts {
      id
      name
    }
  }
`;

export default function Home() {
  const { isLoading, isAuthenticated } = useAuthenticationStatus();

  const { loading, error, data } = useQuery(GET_CRAFTS);

  console.log('loading', loading);
  console.log('error', error);
  console.log('data', data);


  if (isLoading) {
    return 'loading...'
  }

  return (
    <>
      {!isAuthenticated && <Link href='/signin'><button>Sign in</button></Link>}
      {isAuthenticated && <Link href='/signout'><button>Sign out</button></Link>}
      <hr />

      {data?.crafts && <>{data.crafts.map((craft) => <li key={craft.id}>{craft.name}</li>)}</>}
    </>
  )
}
