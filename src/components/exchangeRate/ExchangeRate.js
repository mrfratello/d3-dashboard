import Measure from 'react-measure'
import Control from 'Containers/exchangeRate/control/Control'
import Chart from 'Containers/exchangeRate/chart/Chart'
import './ExchangeRate.scss'

export const ExchangeRate = ({model, fetchCurrencyRateList}) => {
    fetchCurrencyRateList(model)
    return (
        <div className='ExchangeRate'>
            <Control model={model} />
            <Measure client>
                {({measureRef, contentRect}) => (
                    <div ref={measureRef} className='ExchangeRate-Chart'>
                        <Chart widgetId={model.id}
                            width={contentRect.client.width || 10}
                            height={contentRect.client.height - 10 || 20} />
                    </div>
                )}
            </Measure>
        </div>
    )
}

export default ExchangeRate
