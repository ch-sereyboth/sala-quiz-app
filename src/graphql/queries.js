/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getResult = /* GraphQL */ `
  query GetResult($id: ID!) {
    getResult(id: $id) {
      id
      name
      course
      quizroom
      score
      createdAt
      updatedAt
    }
  }
`;
export const listResults = /* GraphQL */ `
  query ListResults(
    $filter: ModelResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        course
        quizroom
        score
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
