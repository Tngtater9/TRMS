import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { AppAction } from './actions';
import reducer, { AppState } from './reducer';

const store: Store<AppState, AppAction> = createStore(
	reducer,
	applyMiddleware(thunk)
);

export default store;
