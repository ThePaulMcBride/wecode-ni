import useSWR from "swr";
import { useEffect, useRef } from "react";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("/api/graphql");

export default function useGraphQL(query, args, user) {
  const userRef = useRef();
  const { data, isValidating, mutate } = useSWR(query, makeRequest);

  useEffect(() => {
    userRef.current = user;
    if (user) mutate();
  }, [user, mutate]);

  async function makeRequest(path) {
    const user = userRef.current;
    if (!user) return null;

    const res = await client.request(query, args);

    return res;
  }

  return { data, isValidating };
}
