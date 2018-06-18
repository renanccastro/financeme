import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ReactTable from 'react-table';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const columns = [
  {
    Header: 'Data',
    accessor: 'title',
    // Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
  },
  {
    Header: 'Descritivo',
    accessor: 'title',
    // Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
  },
  {
    Header: 'Categoria',
    accessor: 'title',
    // Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
  },
  {
    Header: 'Conta',
    accessor: 'title',
    // Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
  },
  {
    Header: 'Recebido',
    accessor: 'title',
    // Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
  },
  {
    Header: 'Total',
    accessor: 'title',
    // Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
  },
];

export const MonthTable = withStyles(styles)(({ classes, data }) => (
  <div>
    <h1>Receita</h1>
    <Paper className={classes.root}>
      <ReactTable
        defaultPageSize={data && data.expenses ? data.expenses.length : 0}
        showPagination={false}
        data={(data && data.expenses) || []}
        columns={columns}
      />
    </Paper>
    <h1>Despesa</h1>
    <Paper className={classes.root}>
      <ReactTable
        defaultPageSize={data && data.incomes ? data.incomes.length : 0}
        showPagination={false}
        data={(data && data.incomes) || []}
        columns={columns}
      />
    </Paper>
  </div>
));
