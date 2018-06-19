import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ReactTable from 'react-table';
import accounting from 'accounting';

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
    accessor: 'dueDate',
    // Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
  },
  {
    Header: 'Descritivo',
    accessor: 'title',
    // Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
  },
  {
    Header: 'Categoria',
    accessor: 'category.title',
    // Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
  },
  {
    Header: 'Conta',
    accessor: 'account.title',
    // Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
  },
  {
    Header: 'Recebido',
    accessor: 'paidDate',
    // Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
  },
  {
    Header: 'Valor',
    accessor: 'value.amount',
    Cell: props => (
      <span className="number">
        {accounting.formatMoney(props.value, 'R$', 2, '.', ',')}
      </span>
    ), // Custom cell components!
  },
];

export const MonthTable = withStyles(styles)(
  ({ classes, expenses: { expensesMonth }, incomes: { incomesMonth } }) => (
    <div>
      <h1>Receita</h1>
      <Paper className={classes.root}>
        <ReactTable
          defaultPageSize={incomesMonth ? incomesMonth.length : 0}
          showPagination={false}
          data={incomesMonth || []}
          columns={columns}
        />
      </Paper>
      <h1>Despesa</h1>
      <Paper className={classes.root}>
        <ReactTable
          defaultPageSize={expensesMonth ? expensesMonth.length : 0}
          showPagination={false}
          data={expensesMonth || []}
          columns={columns}
        />
      </Paper>
    </div>
  )
);
