import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    position: 'relative',
    marginLeft: '50%',

  },
  refresh: {
    marginLeft: '-30px',
  },
};

export const Loading = withStyles(styles)(({ classes }) => (
  <div className={classes.container}>
    <CircularProgress size={60} left={-30} className={classes.refresh} />
  </div>
));
