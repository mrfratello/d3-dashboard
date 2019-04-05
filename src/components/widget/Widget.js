import { Card } from 'primereact/card'
import WidgetHeader from 'Containers/widget/Header'
import ExchangeRate from 'Containers/exchangeRate/ExchangeRate'
import './Widget.scss'


export const Widget = ({id, title, type, width=600, height=400}) =>
    <div className='Widget' style={{marginBottom: 10, width, height}}>
        <Card header={<WidgetHeader title={title} id={id} />}>
            { type && type.type === 'ExchangeRateWidget'
                ? <ExchangeRate model={type}
                                width={width}
                                height={height - 60} />
                : false }
        </Card>
    </div>

export default Widget
