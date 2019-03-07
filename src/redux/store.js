import * as d3 from 'd3'
import { createStore } from 'redux'
import { reducer } from './reducer'

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

const store = createStore(
    reducer, 
    INIT_STORE,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
store.subscribe(() => localStorage.setItem('store', JSON.stringify(store.getState())))

export default store