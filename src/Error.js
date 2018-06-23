import React, { Fragment } from 'react';
import { Snackbar } from '@material-ui/core';
import { showBackButton, updateAppTitle } from './utils/uiUtils';

export const Error = ({ history }) => (
  <Fragment>
    {showBackButton({ history })}
    {updateAppTitle('Voltar')}
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={
        <span id="message-id">
          Um erro ocorreu! Verifique sua conexão com a internet.
        </span>
      }
    />
  </Fragment>
);
