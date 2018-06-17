import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import 'font-awesome/css/font-awesome.css';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import moment from 'moment';
import 'moment/locale/pt-br';
import { default as React } from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { TunnelProvider } from 'react-tunnels';
import { createStore } from 'redux';
import 'tachyons';
import 'typeface-roboto';
import Dinero from 'dinero.js';
import RootContainer from './components/RootContainer';
import { AUTH_TOKEN } from './constant';
import './index.css';

moment.locale('pt-br');
Dinero.globalLocale = 'pt-BR';

const store = createStore(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8e8e8e',
      main: '#616161',
      dark: '#373737',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffd95b',
      main: '#ffa726',
      dark: '#c77800',
      contrastText: '#000000',
    },
  },
});

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

const middlewareLink = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  const tokenValue = localStorage.getItem(AUTH_TOKEN);
  // return the headers to the context so httpLink can read them
  operation.setContext({
    headers: {
      Authorization: tokenValue ? `Bearer ${tokenValue}` : '',
    },
  });
  return forward(operation);
});

// authenticated httplink
const httpLinkAuth = middlewareLink.concat(httpLink);

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000`,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLinkAuth
);

// apollo client setup
const client = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <TunnelProvider>
            <BrowserRouter>
              <RootContainer />
            </BrowserRouter>
          </TunnelProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);
