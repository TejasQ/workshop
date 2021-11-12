/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: search
// ====================================================

export interface search_shop_items {
  __typename: "shop_items";
  id: any;
  name: string;
}

export interface search {
  /**
   * fetch data from the table: "shop_items"
   */
  shop_items: search_shop_items[];
}

export interface searchVariables {
  query: string;
}
