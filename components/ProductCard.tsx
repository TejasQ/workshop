import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  FunctionComponent,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "./Button";
import { AiOutlineHeart } from "react-icons/ai";
import { items_shop_items } from "../__generated__/items";
import { fetchFromHasura } from "../util/fetchFromHasura";
import { addToCart, addToCartVariables } from "../__generated__/addToCart";
import gql from "graphql-tag";
import {
  removeFromCartInCard,
  removeFromCartInCardVariables,
} from "../__generated__/removeFromCartInCard";
import { UserCartContext } from "./UserCartContext";
import { useAutoCompleteIntl } from "../hooks/useAutocompleteIntl";

type Props = {
  item: items_shop_items;
  onItemsChange: () => void;
};

const onClick = () => alert("Product page doesn't exist yet");

export const ProductCard: FunctionComponent<Props> = ({
  item,
  onItemsChange,
}) => {
  const [addingToCartState, setAddingToCartState] = useState<
    "initial" | "inProgress" | "failed" | "succeded"
  >("initial");
  const session = useSession();
  const { push } = useRouter();
  const addLike = (_: string) => alert("Not yet implemented");
  const cart = useContext(UserCartContext);
  const { formatNumber, messages } = useAutoCompleteIntl();

  const login = () => {
    if (session.data?.user) {
      push("/api/logout");
      return;
    }
    window.open("/api/auth/signin", "_blank", "width=640,height=480");
  };

  const clickOnButtonInsideCard = (
    thingToDo: () => void
  ): MouseEventHandler<HTMLButtonElement> => {
    return (e) => {
      e.stopPropagation();
      if (!session.data?.user) {
        login();
      } else {
        thingToDo();
      }
    };
  };

  const doIHaveThisInMyCart = cart.items.find(
    (relationship) => item.id === relationship.item_id
  );

  const addToCart = async (itemId: string) => {
    setAddingToCartState("inProgress");
    try {
      await fetchFromHasura<addToCart, addToCartVariables>({
        query: gql`
          mutation addToCart($itemId: uuid!, $userId: uuid!) {
            insert_shopping_carts_one(
              object: { item_id: $itemId, user_id: $userId }
            ) {
              id
            }
          }
        `,
        variables: { userId: session.data.hasuraId, itemId },
        token: String(session.data?.token),
      });
      setAddingToCartState("succeded");
      onItemsChange();
      cart.refreshCart();
    } catch (e) {
      setAddingToCartState("failed");
    }
  };

  const removeFromCart = async (relationshipId: string) => {
    setAddingToCartState("inProgress");
    try {
      await fetchFromHasura<
        removeFromCartInCard,
        removeFromCartInCardVariables
      >({
        query: gql`
          mutation removeFromCartInCard($id: uuid!) {
            delete_shopping_carts(where: { id: { _eq: $id } }) {
              affected_rows
            }
          }
        `,
        variables: { id: relationshipId },
      });
      setAddingToCartState("succeded");
      onItemsChange();
      cart.refreshCart();
    } catch (e) {
      alert("Failed");
      setAddingToCartState("initial");
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={(e) => {
        if (["Space", "Enter", " "].includes(e.key)) {
          onClick();
        }
      }}
      key={item.id}
      className="shadow my-8 grid items-start gap-2 border p-4 border-gray-300 rounded"
    >
      <div
        style={{ aspectRatio: "1/1" }}
        className="bg-gray-200 -m-4 flex items-center justify-center"
      >
        <img className="max-w-full" alt={item.name} src={item.photo_url} />
      </div>
      <div className="grid items-start gap-2 pt-4">
        <label>
          <strong>{item.name}</strong>
        </label>
        <div className="w-full flex justify-between">
          &euro;{formatNumber(item.price_eur)}{" "}
          <Button
            onKeyPress={(e) => e.stopPropagation()}
            loading={addingToCartState === "inProgress"}
            onClick={clickOnButtonInsideCard(() =>
              doIHaveThisInMyCart
                ? removeFromCart(
                    cart.items.find(
                      (relationship) => relationship.item_id === item.id
                    ).id
                  )
                : addToCart(item.id)
            )}
            style={{ minWidth: 100 }}
            className={`text-white ml-auto ${
              doIHaveThisInMyCart ? "bg-red-500" : "bg-green-600"
            }`}
          >
            {doIHaveThisInMyCart ? "Remove from Cart" : messages["addToCart"]}
          </Button>
          <Button
            onKeyPress={(e) => e.stopPropagation()}
            onClick={clickOnButtonInsideCard(() => addLike(item.id))}
            className="pl-4"
          >
            <AiOutlineHeart size={18} />
          </Button>
        </div>
        <span
          className={`text-xs text-red-500 ${
            addingToCartState !== "failed" ? "invisible" : ""
          }`}
        >
          Failed to add to cart. Please check your internet.
        </span>
      </div>
    </div>
  );
};
