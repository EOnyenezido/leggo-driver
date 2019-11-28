import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

// remove react dev tools before go live
const store = createStore(rootReducer);

export default store;