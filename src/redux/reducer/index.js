import { combineReducers } from 'redux'
import { createReducer } from 'redux-orm'
import { orm } from '../model'
import { exchangeRateChartReducer } from './exchangeRateWidget'

const ormReducer = createReducer(orm)

export const rootReducer = combineReducers({
    orm: ormReducer,
    exchangeRateChart: exchangeRateChartReducer
})
export default rootReducer
