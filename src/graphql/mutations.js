/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNews = /* GraphQL */ `
  mutation CreateNews(
    $input: CreateNewsInput!
    $condition: ModelNewsConditionInput
  ) {
    createNews(input: $input, condition: $condition) {
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
export const updateNews = /* GraphQL */ `
  mutation UpdateNews(
    $input: UpdateNewsInput!
    $condition: ModelNewsConditionInput
  ) {
    updateNews(input: $input, condition: $condition) {
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
export const deleteNews = /* GraphQL */ `
  mutation DeleteNews(
    $input: DeleteNewsInput!
    $condition: ModelNewsConditionInput
  ) {
    deleteNews(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createNotes = /* GraphQL */ `
  mutation CreateNotes(
    $input: CreateNotesInput!
    $condition: ModelNotesConditionInput
  ) {
    createNotes(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateNotes = /* GraphQL */ `
  mutation UpdateNotes(
    $input: UpdateNotesInput!
    $condition: ModelNotesConditionInput
  ) {
    updateNotes(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteNotes = /* GraphQL */ `
  mutation DeleteNotes(
    $input: DeleteNotesInput!
    $condition: ModelNotesConditionInput
  ) {
    deleteNotes(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
