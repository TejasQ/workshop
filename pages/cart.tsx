import gql from "graphql-tag";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { H2 } from "../components/H2";
import { fetchFromHasura } from "../util/fetchFromHasura";
import { getMyCart, getMyCartVariables } from "../__generated__/getMyCart";
import {
  removeFromCart,
  removeFromCartVariables,
} from "../__generated__/removeFromCart";

const Cart = () => {
  const session = useSession();
  const [cartItems, setCartItems] = useState<getMyCart["shopping_carts"]>([]);
  const { formatNumber } = useIntl();

  useEffect(() => {
    if (!session?.data?.token) {
      return;
    }
    fetchFromHasura<getMyCart, getMyCartVariables>({
      query: gql`
        query getMyCart {
          shopping_carts {
            id
            shop_item {
              name
              photo_url
              price_eur
            }
          }
        }
      `,
      token: String(session.data.token),
    }).then(({ data }) => setCartItems(data.shopping_carts));
  }, [session]);

  const removeFromCart = (cartEntryId: string) => {
    fetchFromHasura<removeFromCart, removeFromCartVariables>({
      query: gql`
        mutation removeFromCart($id: uuid!) {
          delete_shopping_carts(where: { id: { _eq: $id } }) {
            affected_rows
          }
        }
      `,
      variables: { id: cartEntryId },
      token: String(session.data.token),
    }).then(() => window.location.reload());
  };

  return (
    <section className="max-w-screen-xl mt-8 mx-auto grid gap-6">
      <H2>Your Cart</H2>
      <div className="grid gap-2">
        {cartItems.map((c) => (
          <div key={c.id} className="border p-2 flex items-center">
            {c.shop_item.name}
            <div className="ml-auto">
              &euro;{formatNumber(c.shop_item.price_eur)}
            </div>
            <button
              onClick={() => removeFromCart(c.id)}
              className="ml-4 text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Cart;
