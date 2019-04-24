import GridLayout from 'react-grid-layout'
import Widget from 'Components/widget/Widget'
import { dashboard } from '../../constants'
import './Dashboard.scss'


export const Dashboard = ({widgets=[], widgetLayoutUpdate}) => {
    return (
        <GridLayout className="layout"
                    width={window.innerWidth}
                    rowHeight={30}
                    cols={6}
                    onLayoutChange={layout => widgetLayoutUpdate(layout)} >
            {
                widgets.map(
                    (widgetParams, i) =>
                        <div key={widgetParams.id}
                            data-grid={{
                                x: 0,
                                y: 0,
                                w: widgetParams.w || dashboard[widgetParams.type.type].w,
                                h: widgetParams.h || dashboard[widgetParams.type.type].h,
                                minW: dashboard[widgetParams.type.type].minW,
                                minH: dashboard[widgetParams.type.type].minH
                            }}>
                            <Widget key={i} {...widgetParams} />
                        </div>
                )
            }
        </GridLayout>
    )
}

export default Dashboard
