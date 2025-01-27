import { DocumentNode } from 'graphql/language/ast';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getServerToken() {
  const cookieStore = await cookies();
  return cookieStore.get('anilist_token')?.value;
}

export async function fetchAniList<T>(query: string | DocumentNode, variables = {}, token?: string) {

  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  //   console.log(response);

  //   if (!response.ok) {
  //     throw new Error(`AniList API error: ${response.statusText}`);
  //   }

  return response.json() as Promise<T>;
}