import gql from "graphql-tag";
import { NextApiHandler } from "next";
import { fetchFromHasura } from "../../util/fetchFromHasura";
import { search, searchVariables } from "../../__generated__/search";

const handler: NextApiHandler = async (req, res) => {
  const { text } = req.query;

  const response = await fetchFromHasura<search, searchVariables>({
    query: gql`
      query search($query: String!) {
        shop_items(where: { name: { _ilike: $query } }) {
          id
          name
        }
      }
    `,
    variables: { query: `%${text}%` },
    token: process.env.HASURA_API_TOKEN,
  });

  res.end(JSON.stringify(response.data.shop_items));
};

export default handler;
