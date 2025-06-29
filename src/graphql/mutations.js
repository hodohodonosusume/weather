/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMemo = /* GraphQL */ `
  mutation CreateMemo(
    $input: CreateMemoInput!
    $condition: ModelMemoConditionInput
  ) {
    createMemo(input: $input, condition: $condition) {
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
export const updateMemo = /* GraphQL */ `
  mutation UpdateMemo(
    $input: UpdateMemoInput!
    $condition: ModelMemoConditionInput
  ) {
    updateMemo(input: $input, condition: $condition) {
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
export const deleteMemo = /* GraphQL */ `
  mutation DeleteMemo(
    $input: DeleteMemoInput!
    $condition: ModelMemoConditionInput
  ) {
    deleteMemo(input: $input, condition: $condition) {
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
export const createFavoriteHorse = /* GraphQL */ `
  mutation CreateFavoriteHorse(
    $input: CreateFavoriteHorseInput!
    $condition: ModelFavoriteHorseConditionInput
  ) {
    createFavoriteHorse(input: $input, condition: $condition) {
      id
      horseName
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateFavoriteHorse = /* GraphQL */ `
  mutation UpdateFavoriteHorse(
    $input: UpdateFavoriteHorseInput!
    $condition: ModelFavoriteHorseConditionInput
  ) {
    updateFavoriteHorse(input: $input, condition: $condition) {
      id
      horseName
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteFavoriteHorse = /* GraphQL */ `
  mutation DeleteFavoriteHorse(
    $input: DeleteFavoriteHorseInput!
    $condition: ModelFavoriteHorseConditionInput
  ) {
    deleteFavoriteHorse(input: $input, condition: $condition) {
      id
      horseName
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
