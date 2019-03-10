import { createStore } from 'redux'
import { createReducer } from 'redux-orm'
import { orm } from './model'
import bootstrap from './bootstrap'


export const store = createStore(
    createReducer(orm),
    bootstrap(orm),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
store.subscribe(() => localStorage.setItem('store', JSON.stringify(store.getState())))

export default store
