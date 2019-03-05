import {Component} from 'react'
import {Dashboard} from './components/dashboard/Dashboard'

class App extends Component {
    render() {
        return (
            <div className='mdc-typography'>
                <Dashboard />
            </div>
        )
    }
}

export default App