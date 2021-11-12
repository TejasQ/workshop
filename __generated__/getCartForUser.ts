/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCartForUser
// ====================================================

export interface getCartForUser_shopping_carts {
  __typename: "shopping_carts";
  id: any;
  item_id: any;
}

export interface getCartForUser {
  /**
   * fetch data from the table: "shopping_carts"
   */
  shopping_carts: getCartForUser_shopping_carts[];
}
