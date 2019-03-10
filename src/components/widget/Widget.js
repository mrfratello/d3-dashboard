import { connect } from "react-redux"
import { Card } from 'primereact/card'
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/components/inplace/Inplace'
import { InputText } from 'primereact/inputtext'
import { ExchangeRateControl } from '../control/ExchangeRate'
import { widgetUpdateTitle } from '../../redux/action/Widget'
import './Widget.scss'


const WidgetHeaderUI = ({id, title, widgetUpdateTitle}) => 
    <div className='WidgetHeader'>
        <Inplace closable={true}>
            <InplaceDisplay>
                <h3 className='WidgetHeader-Title'>{title}</h3>
            </InplaceDisplay>
            <InplaceContent>
                <InputText value={title} 
                           autoFocus
                           onChange={e => widgetUpdateTitle({
                               title: e.target.value,
                               id
                            })} />
            </InplaceContent>
        </Inplace>
    </div>

const WidgetHeader = connect(null, { widgetUpdateTitle })(WidgetHeaderUI)

export const Widget = ({params}) => 
    <div className='Widget' style={{marginBottom: 10}}>
        <Card header={<WidgetHeader title={params.title} id={params.id} />}>
            { params.type && params.type.type === 'ExchangeRate'
                ? <ExchangeRateControl model={params.type} />
                : false }
        </Card>
    </div>
 