import {Card} from 'primereact/card'


export const Widget = ({params}) => 
    <div className='Widget' style={{marginBottom: 10}}>
        <Card title={params.title}>
            Содержимое виджета #{params.id}
        </Card>
    </div>
 