import { connect } from 'react-redux'
import { exchangeRateWidgetUpdate } from 'Redux/action/ExchangeRateWidget'
import { Period } from 'Components/exchangeRate/control/Period'


export default connect(
        null,
        { update: exchangeRateWidgetUpdate }
    )(Period)
