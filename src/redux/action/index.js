import * as d3 from 'd3'
import {v4} from 'uuid'


const dateFieldFormat = d3.timeFormat("%Y-%m-%d")
const datePrepare = date => date instanceof Date ? dateFieldFormat(date) : date

const i = 0

export const addCurrency = (currency={}) => ({
    type: 'ADD_CURRENCY',
    id: v4(),
    name: currency.name,
    code: currency.code,
    currency: currency.currency
})

export const removeCurrency = currencyId => ({
    type: 'REMOVE_CURRENCY',
    id: currencyId
})

export const changeCurrency = (id, {id:currency, name, code}) => ({
    type: 'CHANGE_CURRENCY',
    id,
    name,
    code,
    currency
})

export const changeDateFrom = dateFrom => ({
    type: 'CHANGE_DATE_FROM',
    dateFrom: datePrepare(dateFrom)
})

export const changeDateTo = dateTo => ({
    type: 'CHANGE_DATE_TO',
    dateTo: datePrepare(dateTo)
})
