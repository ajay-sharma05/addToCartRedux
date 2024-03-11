import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./redux/reducers/main";
// import {thunk} from 'redux-thunk';

// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = createStore(rootReducer);

export default store;