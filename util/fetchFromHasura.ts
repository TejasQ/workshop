import { print, DocumentNode } from "graphql";
import fetch from "isomorphic-fetch";

type Options<Variables> = {
  query: DocumentNode;
  variables?: Variables;
  token?: string;
};

export const fetchFromHasura = <Result, Variables = any>({
  query,
  variables,
  token,
}: Options<Variables>): Promise<{ data: Result }> =>
  fetch(process.env.HASURA_API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      query: print(query),
      variables,
    }),
  }).then((r) => r.json());
