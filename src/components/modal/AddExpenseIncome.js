import React from 'react';
import { MoneyField, RenderInput, SubmitButton } from '../../utils/FormUtils';
import { Field } from 'redux-form';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Modal } from '@material-ui/core';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  modal: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  },
});

export const AddExpenseIncome = withStyles(styles)(
  ({ classes, show, hideModal, handleSubmit, ...rest }) => (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={show}
      onClose={hideModal}
    >
      <div className={[classes.paper, classes.modal].join(' ')}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container>
            <Grid item xs={12}>
              <MoneyField name="total" label="Valor" fullWidth />
              <Field
                name="comment"
                label="Comentário"
                multiline
                component={RenderInput}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <SubmitButton fullWidth label="Salvar" {...rest} />
            </Grid>
          </Grid>
        </form>
      </div>
    </Modal>
  )
);
