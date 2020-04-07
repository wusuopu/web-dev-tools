import React from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import { PersistGate } from 'redux-persist/lib/integration/react'
import {HashRouter, BrowserRouter, Route, Switch} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { getPersistor } from '@rematch/persist'

import store from './store';
import History from './lib/history';
import Constants from './constants';
import theme from './theme'

import asyncComponent from './containers/enhancers/async-component'
const HomePage = asyncComponent(() => import('./containers/home-page'));
const JsonTransformPage = asyncComponent(() => import('./containers/json-transform-page'));
const Csv2JsonPage = asyncComponent(() => import('./containers/json-csv/csv2json-page'));
const Json2CsvPage = asyncComponent(() => import('./containers/json-csv/json2csv-page'));


// 前端路由类型，默认使用 Hash 的方式
let Router
if (Constants.REACT_ROUTER_TYPE === 'browser') {
  Router = BrowserRouter
} else {
  if (window.location.search) {
    if (window.history && typeof window.history.pushState === 'function') {
      // 去掉url中的query参数，便于 GA 统计
      try {
        window.history.pushState(
          {},
          '',
          window.location.pathname + window.location.hash,
        );
      } catch (e) {}
    }
  }
  Router = HashRouter
}

class NotFoundPage extends React.PureComponent {
  render() {
    return null
  }
}


const persistor = getPersistor()

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PersistGate persistor={persistor}>
            <Router
              ref={(_ref) => { History.history = _ref.history }}
            >
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/json-transform' component={JsonTransformPage} />
                <Route exact path='/json2csv' component={Json2CsvPage} />
                <Route exact path='/csv2json' component={Csv2JsonPage} />
                <Route component={NotFoundPage} />
              </Switch>
            </Router>
          </PersistGate>
        </ThemeProvider>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
