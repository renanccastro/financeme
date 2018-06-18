import gql from 'graphql-tag';
import moment from 'moment';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { displayLoadingStateQueries } from '../../displayLoadingState';
import { entryFragment } from '../../fragments';
import { MonthTable } from './MonthTable';

const withMe = graphql(
  gql`
    query MeQuery {
      me {
        id
        email
        name
        sheets {
          id
        }
      }
    }
  `,
  {
    name: 'me',
  }
);

const withExpensesData = graphql(
  gql`
    query GetExpenses($date: DateTime!, $sheetId: ID!) {
      expensesMonth(date: $date, sheetId: $sheetId) {
        ...EntryFragment
      }
    }
    ${entryFragment}
  `,
  {
    name: 'expenses',
    options: ownProps => ({
      variables: {
        date: moment().toISOString(),
        sheetId: ownProps.me.me.sheets[0].id,
      },
    }),
  }
);
const withIncomesData = graphql(
  gql`
    query GetIncomes($date: DateTime!, $sheetId: ID!) {
      incomesMonth(date: $date, sheetId: $sheetId) {
        ...EntryFragment
      }
    }
    ${entryFragment}
  `,
  {
    name: 'incomes',
    options: ownProps => ({
      variables: {
        date: moment().toISOString(),
        sheetId: ownProps.me.me.sheets[0].id,
      },
    }),
  }
);

const enhance = compose(
  withMe,
  displayLoadingStateQueries(['me']),
  withExpensesData,
  displayLoadingStateQueries(['me', 'expenses']),
  withIncomesData,
  displayLoadingStateQueries(['me', 'expenses', 'incomes'])
);
export const MonthTableContainer = enhance(MonthTable);
