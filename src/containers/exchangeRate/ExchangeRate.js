import { connect } from 'react-redux'
import { fetchCurrencyRateList } from 'Redux/action/ExchangeRateWidget'
import ExchangeRate from 'Components/exchangeRate/ExchangeRate'


export default connect(
        null,
        { fetchCurrencyRateList }
    )(ExchangeRate)