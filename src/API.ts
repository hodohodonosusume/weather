/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMemoInput = {
  id?: string | null,
  horseName: string,
  date: string,
  tags?: Array< string > | null,
  content: string,
};

export type ModelMemoConditionInput = {
  horseName?: ModelStringInput | null,
  date?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelMemoConditionInput | null > | null,
  or?: Array< ModelMemoConditionInput | null > | null,
  not?: ModelMemoConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Memo = {
  __typename: "Memo",
  id: string,
  horseName: string,
  date: string,
  tags?: Array< string > | null,
  content: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateMemoInput = {
  id: string,
  horseName?: string | null,
  date?: string | null,
  tags?: Array< string > | null,
  content?: string | null,
};

export type DeleteMemoInput = {
  id: string,
};

export type ModelMemoFilterInput = {
  id?: ModelIDInput | null,
  horseName?: ModelStringInput | null,
  date?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMemoFilterInput | null > | null,
  or?: Array< ModelMemoFilterInput | null > | null,
  not?: ModelMemoFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelMemoConnection = {
  __typename: "ModelMemoConnection",
  items:  Array<Memo | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionMemoFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  horseName?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  tags?: ModelSubscriptionStringInput | null,
  content?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMemoFilterInput | null > | null,
  or?: Array< ModelSubscriptionMemoFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateMemoMutationVariables = {
  input: CreateMemoInput,
  condition?: ModelMemoConditionInput | null,
};

export type CreateMemoMutation = {
  createMemo?:  {
    __typename: "Memo",
    id: string,
    horseName: string,
    date: string,
    tags?: Array< string > | null,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateMemoMutationVariables = {
  input: UpdateMemoInput,
  condition?: ModelMemoConditionInput | null,
};

export type UpdateMemoMutation = {
  updateMemo?:  {
    __typename: "Memo",
    id: string,
    horseName: string,
    date: string,
    tags?: Array< string > | null,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteMemoMutationVariables = {
  input: DeleteMemoInput,
  condition?: ModelMemoConditionInput | null,
};

export type DeleteMemoMutation = {
  deleteMemo?:  {
    __typename: "Memo",
    id: string,
    horseName: string,
    date: string,
    tags?: Array< string > | null,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetMemoQueryVariables = {
  id: string,
};

export type GetMemoQuery = {
  getMemo?:  {
    __typename: "Memo",
    id: string,
    horseName: string,
    date: string,
    tags?: Array< string > | null,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListMemosQueryVariables = {
  filter?: ModelMemoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMemosQuery = {
  listMemos?:  {
    __typename: "ModelMemoConnection",
    items:  Array< {
      __typename: "Memo",
      id: string,
      horseName: string,
      date: string,
      tags?: Array< string > | null,
      content: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateMemoSubscriptionVariables = {
  filter?: ModelSubscriptionMemoFilterInput | null,
  owner?: string | null,
};

export type OnCreateMemoSubscription = {
  onCreateMemo?:  {
    __typename: "Memo",
    id: string,
    horseName: string,
    date: string,
    tags?: Array< string > | null,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateMemoSubscriptionVariables = {
  filter?: ModelSubscriptionMemoFilterInput | null,
  owner?: string | null,
};

export type OnUpdateMemoSubscription = {
  onUpdateMemo?:  {
    __typename: "Memo",
    id: string,
    horseName: string,
    date: string,
    tags?: Array< string > | null,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteMemoSubscriptionVariables = {
  filter?: ModelSubscriptionMemoFilterInput | null,
  owner?: string | null,
};

export type OnDeleteMemoSubscription = {
  onDeleteMemo?:  {
    __typename: "Memo",
    id: string,
    horseName: string,
    date: string,
    tags?: Array< string > | null,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
