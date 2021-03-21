/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNews = /* GraphQL */ `
  subscription OnCreateNews {
    onCreateNews {
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
      file {
        bucket
        region
        key
      }
      nameFile
      owner
    }
  }
`;
export const onUpdateNews = /* GraphQL */ `
  subscription OnUpdateNews {
    onUpdateNews {
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
      file {
        bucket
        region
        key
      }
      nameFile
      owner
    }
  }
`;
export const onDeleteNews = /* GraphQL */ `
  subscription OnDeleteNews {
    onDeleteNews {
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
      file {
        bucket
        region
        key
      }
      nameFile
      owner
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
        file {
          bucket
          region
          key
        }
        nameFile
        owner
      }
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
        file {
          bucket
          region
          key
        }
        nameFile
        owner
      }
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
        file {
          bucket
          region
          key
        }
        nameFile
        owner
      }
      updatedAt
    }
  }
`;
export const onCreateNotes = /* GraphQL */ `
  subscription OnCreateNotes($owner: String!) {
    onCreateNotes(owner: $owner) {
      id
      name
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateNotes = /* GraphQL */ `
  subscription OnUpdateNotes($owner: String!) {
    onUpdateNotes(owner: $owner) {
      id
      name
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteNotes = /* GraphQL */ `
  subscription OnDeleteNotes($owner: String!) {
    onDeleteNotes(owner: $owner) {
      id
      name
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
