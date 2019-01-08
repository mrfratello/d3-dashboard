export const exchangeRateReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_CURRENCY': return {
            ...state, 
            id: action.id
        }
        case 'CHANGE_DATE_FROM':  return {
            ...state,
            dateFrom: action.dateFrom
        }
        case 'CHANGE_DATE_TO':  return {
            ...state,
            dateTo: action.dateTo
        }
    }
}


