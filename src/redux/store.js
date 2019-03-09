import * as d3 from 'd3'
import { createStore } from 'redux'
import { createReducer } from 'redux-orm'
import { reducer } from './reducer'
import { orm } from './model';
import bootstrap from './bootstrap';

const dateFieldFormat = d3.timeFormat("%Y-%m-%d")

const NOW = d3.timeDay.floor(new Date())
const DEFAULT_STORE = {
    period: {
        dateFrom: dateFieldFormat(d3.timeDay.offset(NOW, -17)),
        dateTo: dateFieldFormat(NOW)    
    },
    currencies: [{
        id: 'test',
        currency: 'R01235',
        code: 'USD',
        name: 'Доллар США'
    }],
    widgets: [{
        id: 1,
        title: 'Привет мир!'
    }]
}
const STORAGE_STORE = JSON.parse(localStorage.getItem('store')) || {}
const INIT_STORE = Object.assign({}, DEFAULT_STORE, STORAGE_STORE)

const rootReducer = createReducer(orm)

export const store = createStore(
    rootReducer,
    bootstrap(orm),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
store.subscribe(() => localStorage.setItem('store', JSON.stringify(store.getState())))

export default store