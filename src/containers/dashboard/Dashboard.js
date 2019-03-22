import { connect } from 'react-redux'
import { widgetSelector } from 'Redux/selectors'
import Dashboard from 'Components/dashboard/Dashboard'


export default connect(
        state => ({
            widgets: widgetSelector(state)
        })
    )(Dashboard)
