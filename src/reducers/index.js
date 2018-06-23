import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { modalReducer } from './modalReducer';

export const appState = combineReducers({
  form: formReducer,
  modal: modalReducer,
});
