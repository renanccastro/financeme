import { compose } from 'recompose';
import { MonthTable } from './MonthTable';

const enhance = compose();
export const MonthTableContainer = enhance(MonthTable);
