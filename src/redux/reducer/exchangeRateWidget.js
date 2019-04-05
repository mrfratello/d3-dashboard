import { EXCHANGE_RATE_CHART_DATA_UPDATE } from '../action/types'


export const exchangeRateChartReducer = (state = [], action)=> {
    switch (action.type) {
        case EXCHANGE_RATE_CHART_DATA_UPDATE:
            return action.data
        default: 
            return state
    }
}