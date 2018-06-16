import { compose } from 'recompose';
import { Home } from './Home';

const enhance = compose();
export const HomeContainer = enhance(Home);
