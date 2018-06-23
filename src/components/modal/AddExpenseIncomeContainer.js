import { compose, getContext, withHandlers } from 'recompose';
import { AddExpenseIncome } from './AddExpenseIncome';
import { hideAddExpenseIncomeModal } from '../../reducers/modalReducer';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { validateRequired } from '../../utils/FormUtils';
import { omitDeep } from '../../utils/objectUtils';
import { withRouter } from 'react-router-dom';

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
  }),
  reduxForm({
    // a unique name for the form
    form: 'AddCommentForm',
    validate: validateRequired(['idAtividade', 'comentario']),
    onSubmit: (
      values,
      dispatch,
      { addCommentTimeline, history, showAlert }
    ) => {
      const submitValues = omitDeep(values, '__typename');

      return addCommentTimeline({
        variables: { ...submitValues },
      })
        .then(() => history.goBack())
        .catch(({ graphQLErrors = [] }) => {
          const message =
            graphQLErrors.map(e => e.message).join('\n') || 'Erro de Conexão';
          const title = 'Erro!';
          showAlert({ message, title });
        });
    },
  }),
  withRouter
);
export const AddExpenseIncomeContainer = enhance(AddExpenseIncome);
