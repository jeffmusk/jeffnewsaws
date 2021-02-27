/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNews = /* GraphQL */ `
  query GetNews($id: ID!) {
    getNews(id: $id) {
      id
      title
      description
      imgUrl
      url
      author
      MetaData
      createdAt
      updatedAt
      publishedAt
      comments {
        items {
          id
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      owner
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
        description
        imgUrl
        url
        author
        MetaData
        createdAt
        updatedAt
        publishedAt
        comments {
          nextToken
        }
        owner
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      content
      createdAt
      news {
        id
        title
        description
        imgUrl
        url
        author
        MetaData
        createdAt
        updatedAt
        publishedAt
        comments {
          nextToken
        }
        owner
      }
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        createdAt
        news {
          id
          title
          description
          imgUrl
          url
          author
          MetaData
          createdAt
          updatedAt
          publishedAt
          owner
        }
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
