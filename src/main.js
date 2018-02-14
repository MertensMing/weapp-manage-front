import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '@/store/reducers';
import rootSaga from '@/store/sagas';
import AppRouter from '@/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import '@/common/base';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  process.env.NODE_ENV === 'dev' && __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <LocaleProvider locale={zhCN}>
          <AppRouter />
        </LocaleProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('usoccer-admin-app'))
