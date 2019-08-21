import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createReducer from "./rootReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  createReducer(),
  composeEnhancers(applyMiddleware(thunk))
);
store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

const initializeStore = () => {
  injectReducer();
  return store;
};

export default initializeStore;
