import gql from "graphql-tag";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

import { fetchFromHasura } from "../../util/fetchFromHasura";
import {
  clearToken,
  clearTokenVariables,
} from "../../__generated__/clearToken";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  await fetchFromHasura<clearToken, clearTokenVariables>({
    query: gql`
      mutation clearToken($email: String!) {
        update_users(
          where: { email: { _eq: $email } }
          _set: { refresh_token: null }
        ) {
          affected_rows
        }
      }
    `,
    variables: {
      email: session.user.email,
    },
  });

  res.redirect("http://localhost:3000/api/auth/signout");
};

export default handler;
