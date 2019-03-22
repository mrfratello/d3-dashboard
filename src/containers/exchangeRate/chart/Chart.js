import { connect } from 'react-redux'
import {
    exchangeRateChartData,
    exchangeRateChartPeriod
} from 'Redux/selectors'
import ExchangeRateChart from 'Components/exchangeRate/chart/Chart'


export default connect(
        state => ({
            data: exchangeRateChartData(state),
            periods: exchangeRateChartPeriod(state)
        })
    )(ExchangeRateChart)
