import { connect } from "react-redux"
import { Card } from 'primereact/card'
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/components/inplace/Inplace'
import { InputText } from 'primereact/inputtext'
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
            Содержимое виджета #{params.id} {console.log(params.type)}
        </Card>
    </div>
 