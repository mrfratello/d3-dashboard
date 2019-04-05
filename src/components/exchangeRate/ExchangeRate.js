import Control from 'Containers/exchangeRate/control/Control'
import Chart from 'Containers/exchangeRate/chart/Chart'


export const ExchangeRate = ({model, width, height, fetchCurrencyRateList}) => {
    fetchCurrencyRateList(model)
    return <div>
        <Control model={model} />
        <Chart widgetId={model.id} width={width - 28} height={height - 100} />
    </div>
}

export default ExchangeRate
