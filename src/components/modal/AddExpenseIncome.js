import React from 'react';
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
  ({ classes, show, hideModal }) => (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={show}
      onClose={hideModal}
    >
      <div className={[classes.paper, classes.modal].join(' ')}>
        <Typography variant="title" id="modal-title">
          Text in a modal
        </Typography>
        <Typography variant="subheading" id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </div>
    </Modal>
  )
);
