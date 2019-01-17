import {combineReducers} from 'redux'


const periodReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_DATE_FROM':  return {
            ...state,
            dateFrom: action.dateFrom
        }
        case 'CHANGE_DATE_TO':  return {
            ...state,
            dateTo: action.dateTo
        }
        default: return state
    }
}

const currencyReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_CURRENCY':
            return {
                id: action.id,
                currency: action.currency
            }
        case 'CHANGE_CURRENCY':
            return state.id !== action.id 
                ? state
                : {
                    ...state,
                    currency: action.currency
                }
        default: 
            return state
    }
}

const currenciesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CURRENCY':
            return [
                ...state,
                currencyReducer({}, action)
            ]
        case 'CHANGE_CURRENCY':
            return state.map(
                item => currencyReducer(item, action)
            )
        case 'REMOVE_CURRENCY':
            return state.filter(
                item => item.id !== action.id
            )
        default:
            return state
    }
}

export default combineReducers({
    period: periodReducer,
    currencies: currenciesReducer
})
