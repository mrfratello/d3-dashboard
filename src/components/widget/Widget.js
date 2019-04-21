import { Card } from 'primereact/card'
import WidgetHeader from 'Containers/widget/Header'
import ExchangeRate from 'Containers/exchangeRate/ExchangeRate'
import './Widget.scss'


export const Widget = ({id, title, type}) =>
    <div className='Widget'>
        <Card header={<WidgetHeader title={title} id={id} />} style={{height:'100%'}}>
            { type && type.type === 'ExchangeRateWidget'
                ? <ExchangeRate model={type} />
                : false }
        </Card>
    </div>

export default Widget
