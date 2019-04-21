import { InputText } from 'primereact/inputtext'
import {
    Inplace,
    InplaceDisplay,
    InplaceContent
} from 'primereact/components/inplace/Inplace'
import './Header.scss'


export const WidgetHeader = ({id, title, widgetUpdate}) =>
    <div className='WidgetHeader'>
        <Inplace closable={true}>
            <InplaceDisplay>
                <h3 className='WidgetHeader-Title'>{title}</h3>
            </InplaceDisplay>
            <InplaceContent>
                <InputText value={title}
                           autoFocus
                           onChange={e => widgetUpdate({
                               title: e.target.value,
                               id
                            })} />
            </InplaceContent>
        </Inplace>
    </div>

export default WidgetHeader
