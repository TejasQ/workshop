/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeFromCartInCard
// ====================================================

export interface removeFromCartInCard_delete_shopping_carts {
  __typename: "shopping_carts_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface removeFromCartInCard {
  /**
   * delete data from the table: "shopping_carts"
   */
  delete_shopping_carts: removeFromCartInCard_delete_shopping_carts | null;
}

export interface removeFromCartInCardVariables {
  id: any;
}
