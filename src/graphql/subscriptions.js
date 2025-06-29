/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMemo = /* GraphQL */ `
  subscription OnCreateMemo(
    $filter: ModelSubscriptionMemoFilterInput
    $owner: String
  ) {
    onCreateMemo(filter: $filter, owner: $owner) {
      id
      horseName
      date
      tags
      content
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateMemo = /* GraphQL */ `
  subscription OnUpdateMemo(
    $filter: ModelSubscriptionMemoFilterInput
    $owner: String
  ) {
    onUpdateMemo(filter: $filter, owner: $owner) {
      id
      horseName
      date
      tags
      content
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteMemo = /* GraphQL */ `
  subscription OnDeleteMemo(
    $filter: ModelSubscriptionMemoFilterInput
    $owner: String
  ) {
    onDeleteMemo(filter: $filter, owner: $owner) {
      id
      horseName
      date
      tags
      content
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateFavoriteHorse = /* GraphQL */ `
  subscription OnCreateFavoriteHorse(
    $filter: ModelSubscriptionFavoriteHorseFilterInput
    $owner: String
  ) {
    onCreateFavoriteHorse(filter: $filter, owner: $owner) {
      id
      horseName
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateFavoriteHorse = /* GraphQL */ `
  subscription OnUpdateFavoriteHorse(
    $filter: ModelSubscriptionFavoriteHorseFilterInput
    $owner: String
  ) {
    onUpdateFavoriteHorse(filter: $filter, owner: $owner) {
      id
      horseName
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteFavoriteHorse = /* GraphQL */ `
  subscription OnDeleteFavoriteHorse(
    $filter: ModelSubscriptionFavoriteHorseFilterInput
    $owner: String
  ) {
    onDeleteFavoriteHorse(filter: $filter, owner: $owner) {
      id
      horseName
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
