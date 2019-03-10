import {Calendar} from 'primereact/calendar'


const ExchangeRateControlUI = ({model}) => 
    <div className='p-grid p-fluid'>
        <div className='p-col-4'>
            <span className='p-float-label'>
                <Calendar id='dateFrom'
                          value={model.dateFrom} 
                          onChange={(e) => console.log(e.target.value)} 
                          showIcon={true}
                          dateFormat="dd.mm.yy" />
                <label htmlFor='dateFrom'>От</label>
            </span>
        </div>
        <div className='p-col-4'>
            <span className='p-float-label'>
                <Calendar id='dateTo' 
                          value={model.dateTo} 
                          onChange={(e) => false} 
                          showIcon={true}
                          dateFormat="dd.mm.yy" />
                <label htmlFor='dateTo'>До</label>
            </span>
        </div>
    </div>

export const ExchangeRateControl = ExchangeRateControlUI