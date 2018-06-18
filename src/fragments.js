import gql from 'graphql-tag';

export const entryFragment = gql`
  fragment EntryFragment on Entry {
    id
    value
    budget
    createdAt
    title
    text
    author {
      id
      email
      name
    }
    account {
      id
      title
      creditCard
      receiveAccount
    }
    paidDate
    dueDate
  }
`;
