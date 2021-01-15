import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import authenticationReducer from "./reducers/authentication";
import modalVisibilityReducer from './reducers/modalsVisibility'
import App from "./App";

const rootReducer = combineReducers({
  auth: authenticationReducer,
  modVis: modalVisibilityReducer
});



const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
