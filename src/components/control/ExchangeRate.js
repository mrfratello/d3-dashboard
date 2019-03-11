import { connect } from 'react-redux'
import { Calendar } from 'primereact/calendar'
import { exchangeRateWidgetUpdate } from '../../redux/action/ExchangeRateWidget'
import { dateISO } from '../../locale'


const ExchangeRateControlUI = ({model, exchangeRateWidgetUpdate}) => 
    <div className='p-grid p-fluid'>
        <div className='p-col-4'>
            <span className='p-float-label'>
                <Calendar id='dateFrom'
                          value={dateISO.parse(model.dateFrom)} 
                          onChange={(e) => exchangeRateWidgetUpdate({
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
                          onChange={(e) => exchangeRateWidgetUpdate({
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


export const ExchangeRateControl = connect(null, {exchangeRateWidgetUpdate})(ExchangeRateControlUI)
export default ExchangeRateControl
