import { connect } from 'react-redux'
import { exchangeRateWidgetUpdateCurrency } from '../../../redux/action/ExchangeRateWidget'
import { CurrencyPicker } from '../../currencyPicker/CurrencyPicker'


const CurrencyUI = ({currencyItem, updateCurrency}) => 
    <div className='p-grid p-fluid'>
        <div className='p-col-8'>
            <CurrencyPicker value={currencyItem.currency} 
                            onChange={e => console.log(e.target.value)}
                            onChange={e => updateCurrency({
                                currencyId: e.target.value.id,
                                id: currencyItem.id
                            })}
                            autoWidth={false}
                            placeholder='Валюта' />
        </div>
    </div>


export const Currency = connect(
        null, 
        { updateCurrency: exchangeRateWidgetUpdateCurrency }
    )(CurrencyUI)
export default Currency
