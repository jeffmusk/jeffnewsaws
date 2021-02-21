/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNews = /* GraphQL */ `
  query GetNews($id: ID!) {
    getNews(id: $id) {
      id
      title
      content
      imgUrl
      MetaData
      createdAt
      updatedAt
    }
  }
`;
export const listNewss = /* GraphQL */ `
  query ListNewss(
    $filter: ModelNewsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNewss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        imgUrl
        MetaData
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNotes = /* GraphQL */ `
  query GetNotes($id: ID!) {
    getNotes(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listNotess = /* GraphQL */ `
  query ListNotess(
    $filter: ModelNotesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
