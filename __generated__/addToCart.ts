/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addToCart
// ====================================================

export interface addToCart_insert_shopping_carts_one {
  __typename: "shopping_carts";
  id: any;
}

export interface addToCart {
  /**
   * insert a single row into the table: "shopping_carts"
   */
  insert_shopping_carts_one: addToCart_insert_shopping_carts_one | null;
}

export interface addToCartVariables {
  itemId: any;
  userId: any;
}
