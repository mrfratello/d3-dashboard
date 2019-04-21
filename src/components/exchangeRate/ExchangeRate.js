import Measure from 'react-measure'
import Control from 'Containers/exchangeRate/control/Control'
import Chart from 'Containers/exchangeRate/chart/Chart'

export const ExchangeRate = ({model, fetchCurrencyRateList}) => {
    fetchCurrencyRateList(model)
    return (
        <div style={{display:'flex', flexDirection:'column', height: '100%'}}>
            <Control model={model} />
            <Measure client>
                {({measureRef, contentRect}) => (
                    <div ref={measureRef} style={{flex:1, height: 0}}>
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
