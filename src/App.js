import { Component } from 'react'
import { Dashboard } from './components/dashboard/Dashboard'
import { Provider } from 'react-redux'
import store from './redux/store'


const App = () => 
    <Provider store={store}>
        <Dashboard />
    </Provider>

export default App