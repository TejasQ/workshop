import gql from "graphql-tag";
import { useSession } from "next-auth/react";
import { createContext, FunctionComponent, useEffect, useState } from "react";
import { fetchFromHasura } from "../util/fetchFromHasura";
import {
  getCartForUser,
  getCartForUserVariables,
} from "../__generated__/getCartForUser";

export const UserCartContext = createContext({
  items: [] as getCartForUser["shopping_carts"],
  refreshCart: () => {},
});

export const UserCartContextProvider: FunctionComponent = ({ children }) => {
  const [items, setItems] = useState([]);
  const session = useSession();

  const getCart = () => {
    if (!session?.data?.hasuraId) {
      return;
    }
    if (!session.data?.token) {
      return;
    }
    fetchFromHasura<getCartForUser, getCartForUserVariables>({
      query: gql`
        query getCartForUser {
          shopping_carts {
            id
            item_id
          }
        }
      `,
      token: String(session.data.token),
    }).then((items) => setItems(items.data.shopping_carts));
  };

  useEffect(() => {
    getCart();
  }, [session]);

  return (
    <UserCartContext.Provider value={{ items: items, refreshCart: getCart }}>
      {children}
    </UserCartContext.Provider>
  );
};
