import { Card } from 'primereact/card'
import WidgetHeader from 'Containers/widget/Header'
import ExchangeRate from 'Containers/exchangeRate/ExchangeRate'
import './Widget.scss'


export const Widget = ({params}) =>
    <div className='Widget' style={{marginBottom: 10}}>
        <Card header={<WidgetHeader title={params.title} id={params.id} />}>
            { params.type && params.type.type === 'ExchangeRateWidget'
                ? <ExchangeRate model={params.type} />
                : false }
        </Card>
    </div>

export default Widget
