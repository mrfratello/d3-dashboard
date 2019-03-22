import { connect } from 'react-redux'
import { exchangeRateWidgetUpdateCurrency } from 'Redux/action/ExchangeRateWidget'
import { Currency } from 'Components/exchangeRate/control/Currency'


export default connect(
        null,
        { updateCurrency: exchangeRateWidgetUpdateCurrency }
    )(Currency)