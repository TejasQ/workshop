/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addUser
// ====================================================

export interface addUser_insert_users_one {
  __typename: "users";
  id: any;
}

export interface addUser {
  /**
   * insert a single row into the table: "users"
   */
  insert_users_one: addUser_insert_users_one | null;
}

export interface addUserVariables {
  name?: string | null;
  email: string;
  token: string;
}
