import { 
    createStore, 
    combineReducers,
    applyMiddleware, 
    compose 
} from 'redux'
import { createReducer } from 'redux-orm'
import thunk from 'redux-thunk'
import { orm } from './model'
import bootstrap from './bootstrap'
import { fetchCurrencyList } from './action/Currency'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducer = combineReducers({
    orm: createReducer(orm)
})
export const store = createStore(
    rootReducer,
    bootstrap(orm),
    composeEnhancers(
        applyMiddleware(thunk)
    )
)
store.subscribe(() => localStorage.setItem('store', JSON.stringify(store.getState())))
store.dispatch(fetchCurrencyList)

export default store
