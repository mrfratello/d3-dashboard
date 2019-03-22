import Control from 'Containers/exchangeRate/control/Control'
import Chart from 'Containers/exchangeRate/chart/Chart'


export const ExchangeRate = ({model, fetchCurrencyRateList}) => {
    fetchCurrencyRateList(model)
    return <div>
        <Control model={model} />
        <Chart widgetId={model.id} width={1000} height={400} />
    </div>
}

export default ExchangeRate
