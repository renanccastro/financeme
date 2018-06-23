import { compose, getContext, withHandlers } from 'recompose';
import { AddExpenseIncome } from './AddExpenseIncome';
import { hideAddExpenseIncomeModal } from '../../reducers/modalReducer';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const addExpenseIncomeMutation = graphql(gql`
  mutation AddExpenseIncomeMutation(
    $data: ExpenseIncomeInput!
    $type: TypeEnum!
  ) {
    addExpenseIncomeMutation(data: $data, type: $type) {
      id
    }
  }
`);

const enhance = compose(
  addExpenseIncomeMutation,
  getContext({
    store: PropTypes.obj,
  }),
  connect(({ modal: { addExpenseIncome } }) => ({
    show: addExpenseIncome,
  })),
  withHandlers({
    hideModal: ({ store }) => () => {
      store.dispatch(hideAddExpenseIncomeModal());
    },
  })
);
export const AddExpenseIncomeContainer = enhance(AddExpenseIncome);
