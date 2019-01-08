import * as d3 from 'd3'


const dateFieldFormat = d3.timeFormat("%Y-%m-%d")
const datePrepare = date => date instanceof Date ? dateFieldFormat(date) : date

export const changeCurrency = id => ({
    type: 'CHANGE_CURRENCY',
    id
})

export const changeDateFrom = dateFrom => ({
    type: 'CHANGE_DATE_FROM',
    dateFrom: datePrepare(dateFrom)
})

export const changeDateTo = dateTo => ({
    type: 'CHANGE_DATE_TO',
    dateTo: datePrepare(dateTo)
})
