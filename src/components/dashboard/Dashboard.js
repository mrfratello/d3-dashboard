import GridLayout from 'react-grid-layout'
import Widget from 'Components/widget/Widget'
import './Dashboard.scss'


export const Dashboard = ({widgets=[]}) => {
    return (
        <GridLayout className="layout" cols={6} rowHeight={30} width={window.innerWidth}>
            { widgets.map((widgetParams, i) =>
                <div key={i} data-grid={{x: 2, y: 2, w: 3, h: 12}}>
                    <Widget key={i} {...widgetParams} />
                </div>
                )
            }
        </GridLayout>
    )
}

export default Dashboard
