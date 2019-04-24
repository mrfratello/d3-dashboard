import { connect } from 'react-redux'
import { widgetSelector } from 'Redux/selectors'
import { widgetLayoutUpdate } from 'Redux/action/Widget'
import Dashboard from 'Components/dashboard/Dashboard'


export default connect(
        state => ({
            widgets: widgetSelector(state)
        }),
        { widgetLayoutUpdate }
    )(Dashboard)
