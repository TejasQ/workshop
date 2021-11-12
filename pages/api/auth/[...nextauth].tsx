import gql from "graphql-tag";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { sign } from "jsonwebtoken";

import { fetchFromHasura } from "../../../util/fetchFromHasura";
import { addUser, addUserVariables } from "../../../__generated__/addUser";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const { data: userData } = await fetchFromHasura<
          addUser,
          addUserVariables
        >({
          query: gql`
            mutation addUser($name: String, $email: String!, $token: String!) {
              insert_users_one(
                object: { name: $name, refresh_token: $token, email: $email }
                on_conflict: {
                  constraint: users_email_key
                  update_columns: [name]
                }
              ) {
                id
              }
            }
          `,
          variables: {
            email: user.email,
            token: sign("hi", process.env.JWT_SECRET),
            name: user.name,
          },
          token: process.env.HASURA_API_TOKEN,
        });

        token.hasura = {
          "x-hasura-user-id": userData.insert_users_one.id,
          "x-hasura-role": "user",
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
        };
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        hasuraId: token.hasura["x-hasura-user-id"],
        token: sign(
          { hasura: token.hasura } as Record<string, string>,
          process.env.JWT_SECRET
        ),
      };
    },
  },
});
