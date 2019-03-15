import { connect } from 'react-redux'
import { Calendar } from 'primereact/calendar'
import { CurrencyPicker } from '../../currencyPicker/CurrencyPicker'
import { 
    exchangeRateWidgetUpdate, 
    exchangeRateWidgetUpdateCurrency 
} from '../../../redux/action/ExchangeRateWidget'
import { dateISO } from '../../../locale'


const ExchangeRateControlUI = ({model, update, updateCurrency}) => 
    <div>
        <div className='p-grid p-fluid'>
            <div className='p-col-4'>
                <span className='p-float-label'>
                    <Calendar id='dateFrom'
                            value={dateISO.parse(model.dateFrom)} 
                            onChange={(e) => update({
                                dateFrom: dateISO.format(e.target.value),
                                id: model.id
                            })}
                            maxDate={dateISO.parse(model.dateTo)}
                            showIcon={true}
                            dateFormat="dd.mm.yy" />
                    <label htmlFor='dateFrom'>От</label>
                </span>
            </div>
            <div className='p-col-4'>
                <span className='p-float-label'>
                    <Calendar id='dateTo' 
                            value={dateISO.parse(model.dateTo)} 
                            onChange={(e) => update({
                                dateTo: dateISO.format(e.target.value),
                                id: model.id
                            })}
                            minDate={dateISO.parse(model.dateFrom)}
                            showIcon={true}
                            dateFormat="dd.mm.yy" />
                    <label htmlFor='dateTo'>До</label>
                </span>
            </div>
        </div>
        <div className='p-grid p-fluid'>
            <div className='p-col-8'>
                <CurrencyPicker value={model.currency} 
                                onChange={e => updateCurrency({
                                    currencyId: e.target.value.id,
                                    id: model.id
                                })}
                                autoWidth={false}
                                placeholder='Валюта' />
            </div>
        </div>
    </div>


export const ExchangeRateControl = connect(
        null,
        {
            update: exchangeRateWidgetUpdate,
            updateCurrency: exchangeRateWidgetUpdateCurrency
        }
    )(ExchangeRateControlUI)
export default ExchangeRateControl
