import { connect } from 'react-redux'
import { addCurrencyItem, removeCurrencyItem } from 'Redux/action/ExchangeRateWidget'
import { ExchangeRateControl } from 'Components/exchangeRate/control/Control'


export default connect(
        null,
        { addCurrencyItem, removeCurrencyItem }
    )(ExchangeRateControl)
