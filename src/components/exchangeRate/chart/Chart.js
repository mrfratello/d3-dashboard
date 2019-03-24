import { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { withFauxDOM } from 'react-faux-dom'
import withD3Chart from 'HOC/withD3Chart'
import { dateGOSTR, dateISO } from '../../../locale'
import './Chart.scss'


const toDate = date => date instanceof Date ? date : dateISO.parse(date)

class ExchangeRateChart extends Component {

    constructor(props) {
        super(props)
        this.initConstants()
    }

    initConstants() {
        this.CLS_AXIS = 'ExchangeCurrencyAxis'
        this.CLS_AXIS_Y = 'ExchangeCurrencyAxis_orient_y'
        this.CLS_AXIS_X = 'ExchangeCurrencyAxis_orient_x'
        this.CLS_CONTAINER_LINES = 'ExchangeCurrencyContainerLines'
        this.CLS_LINE = 'ExchangeCurrencyContainerLines-Line'
        this.CLS_CONTAINER_MARKERS = 'ExchangeCurrencyContainerMarkers'
        this.CLS_MARKERS = 'ExchangeCurrencyContainerMarkers-Marker'

        this.animSlow = d3.transition()
            .duration(500)
            .ease(d3.easeQuadInOut)
        this.animFast =  d3.transition()
            .duration(100)
            .ease(d3.easeQuadInOut)
        this.color = d3.scaleOrdinal().range(d3.schemeCategory10)
        return this
    }

    initChart() {
        const faux = this.props.connectFauxDOM('svg', 'chart')
        this.svg = d3.select(faux)
                .attr('width', this.props.width)
                .attr('height', this.props.height)
        this.initSizes()
            .initScales()
            .initAxis()
            // .initAim()
            .initLines()
            // .initLegend()
        this.props.animateFauxDOM(800)
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

    initScales() {
        this.scaleRate = d3.scaleLinear()
            .range([this.bottomY, this.topY])
            .domain([0, 1])
        this.scaleDate = d3.scaleTime()
            .range([this.leftX, this.rightX])
            .domain([new Date(), new Date()])
        return this
    }

    initAxis() {
        this.axisRate = this.svg.append('g')
            .classed(this.CLS_AXIS, true)
            .classed(this.CLS_AXIS_Y, true)
            .attr('transform', `translate(${this.leftX}, 0)`)
        this.axisDate = this.svg.append('g')
            .classed(this.CLS_AXIS, true)
            .classed(this.CLS_AXIS_X, true)
            .attr('transform', `translate(0, ${this.bottomY})`)

        const axisRateFn = d3.axisLeft()
            .scale(this.scaleRate)
        this.axisRate
            .call(axisRateFn)

        const axisDateFn = d3.axisBottom()
            .scale(this.scaleDate)
            .tickFormat(dateGOSTR.format)
        this.axisDate
            .call(axisDateFn)
        return this
    }

    initLines() {
        this.lineFn = d3.line()
        this.linesContainer = this.svg.append('g')
            .classed(this.CLS_CONTAINER_LINES, true)
        this.markersContainer = this.svg.append('g')
            .classed(this.CLS_CONTAINER_MARKERS, true)
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

    updateChart() {
        const faux = this.props.connectFauxDOM('svg', 'chart')
        this.svg = d3.select(faux)
        this.dataset = this.props.data.slice()
        this.updateScales()
            .updateAxis()
            .updateLines()
            // .updateLegend()
    }

    updateScales() {
        if (!this.dataset.length) {
            return this
        }
        const {dateFrom, dateTo} = this.extractPeriod(this.props.periods)
        let [minRate, maxRate] = this.dataset.map(({set}) => d3.extent(set, d => d.rate))
                .reduce((extent, item) => [
                    Math.min(extent[0], item[0]),
                    Math.max(extent[1], item[1])
                ])
        minRate *= .9
        maxRate *= 1.1
        const dateDomain = [
            d3.timeDay.offset(toDate(dateFrom), -1),
            d3.timeDay.offset(toDate(dateTo), 1)
        ]
        this.scaleRate.domain([minRate, maxRate])
        this.scaleDate.domain(dateDomain)
        return this
    }

    updateAxis() {
        const axisRateFn = d3.axisLeft()
            .scale(this.scaleRate)
        this.axisRate
            .transition(this.animSlow)
            .call(axisRateFn)

        const dateTicksCount = Math.min(d3.timeDay.count(...this.scaleDate.domain()), 10)
        const axisDateFn = d3.axisBottom()
            .scale(this.scaleDate)
            .tickFormat(dateGOSTR.format)
            .ticks(dateTicksCount)
        this.axisDate
            .transition(this.animSlow)
            .call(axisDateFn)
        this.props.animateFauxDOM(800)
        return this
    }

    updateLines() {
        this.lineFn
            .x(d => this.scaleDate(d.date))
            .y(d => this.scaleRate(d.rate))
        const lines = this.linesContainer.selectAll('.currency-line')
            .data(this.dataset)
        lines.exit().remove()
        const newLines = this.enterLines(lines)
        lines.merge(newLines)
            .datum(d => d.set)
            .transition(this.animSlow)
            .attr('d', d => this.lineFn(d))
        this.props.animateFauxDOM(800)
        this.updateMarkerGroups()
        return this
    }

    enterLines(lines) {
        return lines.enter()
            .append('path')
            .classed('currency-line', true)
            .attr('fill', 'none')
            .attr('stroke', (d, i) => this.color(i))
            .attr('stroke-width', 1)
    }

    updateMarkerGroups() {
        const markerGroups = this.markersContainer
            .selectAll('.currency-markers__group')
            .data(this.dataset)
        markerGroups.exit().remove()
        const newMarkerGroups = markerGroups.enter()
            .append('g')
            .classed('currency-markers__group', true)
        this.updateMarkers(markerGroups.merge(newMarkerGroups))
    }

    updateMarkers(groups) {
        const markers = groups.selectAll('.currency-marker')
            .data((d, i) => d.set.map(item => ({
                ...item,
                i
            })), d => d.date)
        this.removeMarkers(markers)
        this.enterMarkers(markers)
        markers.transition(this.animSlow)
            .attr('cy', d => this.scaleRate(d.rate))
            .attr('cx', d => this.scaleDate(d.date))
        return this
    }

    removeMarkers(markers) {
        markers.exit()
            .transition(this.animSlow)
            .attr('cy', d => this.scaleRate(d.rate))
            .attr('cx', d => this.scaleDate(d.date))
            .attr('r', 0)
            .remove()
    }

    enterMarkers(markers) {
        const self = this
        return markers.enter()
            .append('circle')
            .classed('currency-marker', true)
            .attr('cy', d => this.scaleRate(d.rate))
            .attr('cx', d => this.scaleDate(d.date))
            .attr('fill', d => d3.color(this.color(d.i)))
            .attr('r', 4)
            .attr('stroke', 'transparent')
            .attr('stroke-width', 4)
            .on('mouseover', function(d) {
                d3.select(this)
                    .interrupt()
                    .transition(self.animFast)
                    .attr('r', 8)
                    .attr('stroke-width', 0)
            })
            .on('mouseout', function(d) {
                d3.select(this)
                    .interrupt()
                    .transition(self.animFast)
                    .attr('r', 4)
                    .attr('stroke-width', 4)
        })
            // .on('mouseover.aim', d => this.replaceAimLines(d))
            // .on('mouseout.aim', () => this.hideAimLines())
    }

    replaceAimLines({rate, date}) {
        // this.showAimLines()
        this.aimLineY
            .interrupt(self.animFast)
            .transition(this.animFast)
            .attr('x1', this.scaleDate(date))
            .attr('x2', this.scaleDate.range()[0])
            .attr('y1', this.scaleRate(rate))
            .attr('y2', this.scaleRate(rate))
        this.aimLineX
            .interrupt(self.animFast)
            .transition(this.animFast)
            .attr('x1', this.scaleDate(date) + .5)
            .attr('x2', this.scaleDate(date) + .5)
            .attr('y1', this.scaleRate(rate))
            .attr('y2', this.scaleRate.range()[0])
    }

    render() {
        return <Fragment>
            { this.props.chart }
        </Fragment>
    }
}

ExchangeRateChart.defaultProps = {
    margin: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 300
    },
    padding: {
        top: 30,
        bottom: 30,
        left: 50,
        right: 30
    }
}

ExchangeRateChart.propTypes = {
    widgetId: PropTypes.any.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.object,
    padding: PropTypes.object
}

export default withFauxDOM(
        withD3Chart({updateOn: ['data', 'periods']})(ExchangeRateChart)
    )
