// ファイルの場所: src/graphql/queries.ts

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
      }
      nextToken
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
      }
      nextToken
    }
  }
`;
