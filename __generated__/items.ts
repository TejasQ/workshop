/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: items
// ====================================================

export interface items_shop_items {
  __typename: "shop_items";
  id: any;
  name: string;
  photo_url: string | null;
  price_eur: number | null;
}

export interface items {
  /**
   * fetch data from the table: "shop_items"
   */
  shop_items: items_shop_items[];
}
