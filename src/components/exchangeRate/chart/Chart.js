import PropTypes from 'prop-types'
import { withFauxDOM } from 'react-faux-dom'
import { BaseChart } from 'Components/BaseChart/BaseChart'
import withD3Chart from 'HOC/withD3Chart'
import ChartInitial from './Initial'
import ChartRefresher from './Refresher'
import './Chart.scss'


class ExchangeRateChart extends BaseChart {

    constructor(props) {
        super(props)
        this.initial = new ChartInitial(this)
        this.refresher = new ChartRefresher(this)
    }

    initConstants() {
        super.initConstants()
        this.CLS_AXIS = 'ExchangeCurrencyAxis'
        this.CLS_AXIS_Y = 'ExchangeCurrencyAxis_orient_y'
        this.CLS_AXIS_X = 'ExchangeCurrencyAxis_orient_x'
        this.CLS_CONTAINER_LINES = 'ExchangeCurrencyContainerLines'
        this.CLS_LINE = 'ExchangeCurrencyContainerLines-Line'
        this.CLS_CONTAINER_MARKERS = 'ExchangeCurrencyContainerMarkers'
        this.CLS_MARKERS = 'ExchangeCurrencyContainerMarkers-Marker'
        return this
    }

    shouldUpdate(params, prevParams) {
        const isEqualData = params.data === prevParams.data
        const period = this.extractPeriod(params.periods)
        const prevPeriod = this.extractPeriod(prevParams.periods)
        const isEqualPeriod = period === prevPeriod
        return !isEqualData || !isEqualPeriod
    }

    extractPeriod(periods) {
        const {widgetId} = this.props
        const [period] = periods.filter(item => item.id === widgetId)
        return period
    }

    showAimLines() {
        this.aimGroup
            .classed('currency-aim_hidden', false)
    }

    hideAimLines() {
        this.aimGroup
            .classed('currency-aim_hidden', true)
        return this
    }
}

ExchangeRateChart.defaultProps = {
    ...BaseChart.defaultProps,
    padding: {
        ...BaseChart.defaultProps.padding,
        left: 50
    }
}

ExchangeRateChart.propTypes = {
    ...BaseChart.propTypes,
    widgetId: PropTypes.any.isRequired
}

export default withFauxDOM(
        withD3Chart({updateOn: ['data', 'periods']})(ExchangeRateChart)
    )
