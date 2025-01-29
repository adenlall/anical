import { DocumentNode } from "graphql/language/ast";
import { print } from 'graphql/language/printer';

export async function Anilist<T>(
  query: DocumentNode,
  variables?: Record<string, any>
): Promise<T> {
  const rawq = print(query);
  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: rawq,
      variables,
    }),
    cache: "force-cache"
  });


  const json = await response.json();
  if (json.errors) {
    console.log(json);
    throw new Error(`response was not ok: ${response.statusText}`);
  }
  return json.data;
}