import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import BaseLayout from './components/BaseLayout'
import Home from './components/Home'
import Tv from './components/Content/Tv'
import Setting from './components/Setting'

import reducers from './reducers'

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={BaseLayout}>
        <IndexRoute component={Home} />
        <Route path="/setting" component={Setting} />
        <Route path="/content/tv" component={Tv} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app-container')
)