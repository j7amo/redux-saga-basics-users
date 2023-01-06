import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import reducers from './reducers';
import rootSaga from './sagas';
import 'bootstrap/dist/css/bootstrap.min.css';

// STEP-6:
// initialize Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// STEP-7:
// connect Saga Middleware to Redux
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

// STEP-8
// run "rootSaga" to start all WATCHER sagas, and now we can just
// dispatch corresponding actions from UI and trigger WORKER sagas
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
