import { createAction, handleActions } from 'redux-actions';

const defaultState = { addExpenseIncome: false };

export const showAddExpenseIncomeModal = createAction(
  'SHOW_ADD_EXPENSE_INCOME_MODAL'
);
export const hideAddExpenseIncomeModal = createAction(
  'HIDE_ADD_EXPENSE_INCOME_MODAL'
);
export const modalReducer = handleActions(
  {
    [showAddExpenseIncomeModal]: state => ({
      ...state,
      addExpenseIncome: true,
    }),
    [hideAddExpenseIncomeModal]: state => ({ ...state, ...defaultState }),
  },
  defaultState
);
