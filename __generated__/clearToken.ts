/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: clearToken
// ====================================================

export interface clearToken_update_users {
  __typename: "users_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface clearToken {
  /**
   * update data of the table: "users"
   */
  update_users: clearToken_update_users | null;
}

export interface clearTokenVariables {
  email: string;
}
