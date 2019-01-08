import {createStore} from 'redux';
import {exchangeRateReducer} from './reducer';

const store = createStore(exchangeRateReducer)
store.subscribe(() => localStorage.setItem('store', JSON.stringify(store.getState())))

export default store