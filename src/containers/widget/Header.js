import { connect } from 'react-redux'
import { widgetUpdate } from 'Redux/action/Widget'
import { WidgetHeader } from 'Components/widget/Header'


export default connect(null, { widgetUpdate })(WidgetHeader)
