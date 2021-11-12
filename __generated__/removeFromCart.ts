/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeFromCart
// ====================================================

export interface removeFromCart_delete_shopping_carts {
  __typename: "shopping_carts_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface removeFromCart {
  /**
   * delete data from the table: "shopping_carts"
   */
  delete_shopping_carts: removeFromCart_delete_shopping_carts | null;
}

export interface removeFromCartVariables {
  id: any;
}
