import { getServerToken } from "@/lib/auth";
import { DocumentNode } from "graphql/language/ast";
import { print } from 'graphql/language/printer';
import { redirect } from "next/navigation";

export async function Anilist<T>(
  query: DocumentNode,
  variables?: Record<string, any>
): Promise<T> {
  const token = await getServerToken();
  if (!token) {
    redirect("/");
  }
  const rawq = print(query);
  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
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