const datePrepare = date => date

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
