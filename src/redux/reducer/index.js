import { combineReducers } from 'redux'
import { widgetsReducer } from './widgets'


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
                name: action.name,
                code: action.code,
                currency: action.currency,
            }
        case 'CHANGE_CURRENCY':
            return state.id !== action.id 
                ? state
                : {
                    ...state,
                    name: action.name,
                    code: action.code,
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

export const reducer = combineReducers({
    period: periodReducer,
    currencies: currenciesReducer,
    widgets: widgetsReducer
})
