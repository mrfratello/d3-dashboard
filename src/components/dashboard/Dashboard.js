import { connect } from "react-redux"
import { ScrollPanel } from 'primereact/scrollpanel'
import { Widget } from '../widget/Widget'
import './Dashboard.scss'


const DashboardUI = ({widgets=[]}) => 
    <ScrollPanel style={{width: window.innerWidth, height: window.innerHeight}} className='Dashboard'>
        <div className='Dashboard-Content'>
            { widgets.map((widgetParams, i) => 
                <Widget key={i} params={widgetParams} />) }
        </div>
    </ScrollPanel>


export const Dashboard = connect(
        ({widgets}) => ({ widgets})
    )(DashboardUI)
