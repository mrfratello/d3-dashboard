import { Card } from 'primereact/card'
import { withContentRect } from 'react-measure'
import WidgetHeader from 'Containers/widget/Header'
import ExchangeRate from 'Containers/exchangeRate/ExchangeRate'
import './Widget.scss'


export const Widget = ({id, title, type, contentRect, measureRef}) =>
    <div ref={measureRef} className='Widget' style={{marginBottom:10, height:'100%'}}>
        <Card header={<WidgetHeader title={title} id={id} />} style={{height:'100%'}}>
            { type && type.type === 'ExchangeRateWidget'
                ? <ExchangeRate model={type}
                                width={contentRect.entry.width || 600}
                                height={contentRect.entry.height - 60 || 340} />
                : false }
        </Card>
    </div>

export default withContentRect()(Widget)
