import { Component } from 'react'
import Measure from 'react-measure'
import Control from 'Containers/exchangeRate/control/Control'
import Chart from 'Containers/exchangeRate/chart/Chart'


export default class ExchangeRate extends Component {
    componentDidMount() {
        const {model, fetchCurrencyRateList} = this.props
        fetchCurrencyRateList(model)
    }

    componentDidUpdate() {
        const {model, fetchCurrencyRateList} = this.props
        fetchCurrencyRateList(model)
    }

    render() {
        const {model} = this.props
        return (
            <Measure client>
                {({measureRef, contentRect}) => (
                    <div style={{display:'flex', flexDirection:'column', height: '100%'}}>
                        <Control model={model} />
                        <div ref={measureRef} style={{flex:1, height: 0}}>
                            <Chart widgetId={model.id}
                                width={contentRect.client.width || 10}
                                height={contentRect.client.height - 10 || 20} />
                        </div>
                    </div>
                )}
            </Measure>
        )
    }
}
