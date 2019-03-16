import { connect } from 'react-redux'
import { addCurrencyItem, removeCurrencyItem } from '../../../redux/action/ExchangeRateWidget'
import { Period } from './Period'
import { Currencies } from './Currencies'


const ExchangeRateControlUI = ({model, addCurrencyItem, removeCurrencyItem}) =>
    <div>
        <Period model={model} />
        <div className='p-grid p-fluid'>
            <div className='p-col-8'>
                <Currencies currencies={model.currencies}
                            onAdd={() => addCurrencyItem({ id: model.id })}
                            onRemove={currency => removeCurrencyItem(currency)} />
            </div>
        </div>
    </div>

export const ExchangeRateControl = connect(
    null,
    { addCurrencyItem, removeCurrencyItem }
)(ExchangeRateControlUI)
export default ExchangeRateControl
