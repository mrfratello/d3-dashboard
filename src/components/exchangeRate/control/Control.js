import Period from 'Containers/exchangeRate/control/Period'
import { Currencies } from './Currencies'


export const ExchangeRateControl = ({model, addCurrencyItem, removeCurrencyItem}) =>
    <div>
        <Period model={model} />
        <div className='p-grid p-fluid'>
            <div className='p-col'>
                <Currencies currencies={model.currencies}
                            onAdd={() => addCurrencyItem({ id: model.id })}
                            onRemove={currency => removeCurrencyItem(currency)} />
            </div>
        </div>
    </div>

export default ExchangeRateControl
