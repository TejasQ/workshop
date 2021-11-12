import gql from "graphql-tag";
import { NextApiHandler } from "next";
import { fetchFromHasura } from "../../util/fetchFromHasura";
import { items } from "../../__generated__/items";

const handler: NextApiHandler = async (req, res) => {
  const response = await fetchFromHasura<items>({
    query: gql`
      query items {
        shop_items {
          id
          name
          photo_url
          price_eur
        }
      }
    `,
    token: process.env.HASURA_API_TOKEN,
  });

  res.end(JSON.stringify(response.data.shop_items));
};

export default handler;
