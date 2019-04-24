import GridLayout from 'react-grid-layout'
import Widget from 'Components/widget/Widget'
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
                                w: widgetParams.w || 4,
                                h: widgetParams.h || 12,
                                minH: 10,
                                minW: 3
                            }}>
                            <Widget key={i} {...widgetParams} />
                        </div>
                )
            }
        </GridLayout>
    )
}

export default Dashboard
