/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMemo = /* GraphQL */ `
  query GetMemo($id: ID!) {
    getMemo(id: $id) {
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
export const listMemos = /* GraphQL */ `
  query ListMemos(
    $filter: ModelMemoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMemos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getFavoriteHorse = /* GraphQL */ `
  query GetFavoriteHorse($id: ID!) {
    getFavoriteHorse(id: $id) {
      id
      horseName
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listFavoriteHorses = /* GraphQL */ `
  query ListFavoriteHorses(
    $filter: ModelFavoriteHorseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavoriteHorses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        horseName
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
