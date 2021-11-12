/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMyCart
// ====================================================

export interface getMyCart_shopping_carts_shop_item {
  __typename: "shop_items";
  name: string;
  photo_url: string | null;
  price_eur: number | null;
}

export interface getMyCart_shopping_carts {
  __typename: "shopping_carts";
  id: any;
  /**
   * An object relationship
   */
  shop_item: getMyCart_shopping_carts_shop_item;
}

export interface getMyCart {
  /**
   * fetch data from the table: "shopping_carts"
   */
  shopping_carts: getMyCart_shopping_carts[];
}
