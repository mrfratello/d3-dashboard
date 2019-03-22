import { Provider } from 'react-redux'
import Dashboard from 'Containers/dashboard/Dashboard'
import store from 'Redux/store'


const App = () =>
    <Provider store={store}>
        <Dashboard />
    </Provider>

export default App