import { 
    createStore, 
    applyMiddleware, 
    compose 
} from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducer'
import { orm } from './model'
import bootstrap from './bootstrap'
import { fetchCurrencyList } from './action/Currency'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
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
