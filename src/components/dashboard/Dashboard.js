import { ScrollPanel } from 'primereact/scrollpanel'
import { Widget } from 'Components/widget/Widget'
import './Dashboard.scss'


export const Dashboard = ({widgets=[]}) =>
    <ScrollPanel style={{width: window.innerWidth, height: window.innerHeight}} className='Dashboard'>
        <div className='Dashboard-Content'>
            { widgets.map((widgetParams, i) =>
                <Widget key={i} {...widgetParams} />) }
        </div>
    </ScrollPanel>

export default Dashboard
