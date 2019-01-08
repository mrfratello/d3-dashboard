import * as d3 from 'd3'
import {createStore} from 'redux'
import {exchangeRateReducer} from './reducer'

const NOW = new Date()
const DEFAULT_STORE = {
    id: 'R01235',
    dateFrom: d3.timeDay.offset(NOW, -17),
    dateTo: NOW
} 
const STORAGE_STORE = JSON.parse(localStorage.getItem('store')) || {}
const INIT_STORE = Object.assign({}, DEFAULT_STORE, STORAGE_STORE)

const store = createStore(exchangeRateReducer, INIT_STORE)
store.subscribe(() => localStorage.setItem('store', JSON.stringify(store.getState())))

export default store