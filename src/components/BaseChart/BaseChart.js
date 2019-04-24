import { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

/**
 * Базовый класс для графиков d3
 */
export class BaseChart extends Component {

    constructor(props) {
        super(props)
        this.initConstants()
    }

    initConstants() {
        this.animSlow = d3.transition()
            .duration(500)
            .ease(d3.easeQuadInOut)
        this.animFast =  d3.transition()
            .duration(100)
            .ease(d3.easeQuadInOut)
        return this
    }

    initSizes() {
        const {width, height, margin, padding} = this.props
        this.innerWidth = width - (margin.left + margin.right + padding.left + padding.right)
        this.innerHeight = height - (margin.top + margin.bottom + padding.top + padding.bottom)
        this.leftX = margin.left + padding.left
        this.rightX = this.leftX + this.innerWidth
        this.topY = margin.top + padding.top
        this.bottomY = this.topY + this.innerHeight
        return this
    }

    initChart() {
        this.initial.initChart()
        return this
    }

    updateChart() {
        this.refresher.updateChart()
        return this
    }

    resizeChart() {
        this.initSizes()
            .resizer
            .resizeChart()
        return this
    }

    shouldResize({width, height}, {width:prevWidth, height:prevHeight}) {
        return width !== prevWidth || height !== prevHeight
    }

    render() {
        return <Fragment>
            { this.props.chart }
        </Fragment>
    }
}

BaseChart.defaultProps = {
    margin: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    },
    padding: {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
    }
}

BaseChart.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.object,
    padding: PropTypes.object
}

export default BaseChart
