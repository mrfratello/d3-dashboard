import { connect } from 'react-redux'
import { ExchangeRateControl } from './control'
import ExchangeRateChart from './chart/Chart'
import { fetchCurrencyRateList } from '../../redux/action/ExchangeRateWidget'


const ExchangeRateUI = ({model, fetchCurrencyRateList}) => {
    fetchCurrencyRateList(model)
    return <div>
        <ExchangeRateControl model={model} />
        <ExchangeRateChart width={1000} height={400} />
    </div>
}

export const ExchangeRate = connect(
        null,
        { fetchCurrencyRateList }
    )(ExchangeRateUI)
export default ExchangeRate
