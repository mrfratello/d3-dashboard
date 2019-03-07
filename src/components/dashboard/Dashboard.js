import {ScrollPanel} from 'primereact/scrollpanel'
import {Widget} from '../widget/Widget'
import './Dashboard.scss'


export const Dashboard = ({widgets=[{id: 1, title:'Виджет расходов'}, {id: 2, title:'Виджет доходов'}]}) => 
    <ScrollPanel style={{width: window.innerWidth, height: window.innerHeight}} className='Dashboard'>
        <div className='Dashboard-Content'>
            { widgets.map((widgetParams, i) => 
                <Widget key={i} params={widgetParams} />) }
        </div>
    </ScrollPanel>
 