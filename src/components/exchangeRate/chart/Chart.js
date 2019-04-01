import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { withFauxDOM } from 'react-faux-dom'
import { BaseChart } from 'Components/BaseChart/BaseChart'
import withD3Chart from 'HOC/withD3Chart'
import { dateGOSTR, dateISO } from '../../../locale'
import color from '../color'
import './Chart.scss'


const toDate = date => date instanceof Date ? date : dateISO.parse(date)

class ExchangeRateChart extends BaseChart {

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

    initChart() {
        const faux = this.props.connectFauxDOM('svg', 'chart')
        this.svg = d3.select(faux)
                .attr('width', this.props.width)
                .attr('height', this.props.height)
        this.initSizes()
            .initScales()
            .initAxis()
            .initAim()
            .initLines()
        this.props.animateFauxDOM(800)
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

    initAim() {
        this.aimGroup = this.svg.append('g')
            .classed('currency-aim', true)
            .classed('currency-aim_hidden', true)
        this.aimLineY = this.aimGroup.append('line')
            .classed('currency-aim__line', true)
            .classed('currency-aim__line_type_y', true)
            .attr('x1', -1)
            .attr('x2', -1)
            .attr('y1', -1)
            .attr('y2', -1)
        this.props.animateFauxDOM(800)
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
        this.hideAimLines()
            .updateScales()
            .updateAxis()
            .updateLines()
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
        this.linesContainer.selectAll('.currency-line')
            .data(this.dataset, d => d.id)
            .join(enter => this.enterLines(enter))
            .datum(d => d.set)
            .transition(this.animSlow)
            .attr('d', d => this.lineFn(d))
        this.props.animateFauxDOM(800)
        this.updateMarkerGroups()
        return this
    }

    enterLines(lines) {
        return lines.append('path')
            .classed('currency-line', true)
            .attr('fill', 'none')
            .attr('stroke', d => color(d.id))
            .attr('stroke-width', 1)
    }

    updateMarkerGroups() {
        const markerGroups = this.markersContainer
            .selectAll('.currency-markers__group')
            .data(this.dataset, d => d.id)
            .join(enter => enter.append('g').classed('currency-markers__group', true))
        this.updateMarkers(markerGroups)
        this.props.animateFauxDOM(800)
    }

    updateMarkers(groups) {
        groups.selectAll('.currency-marker')
            .data(d => d.set.map(item => ({
                ...item,
                setId: d.id
            })), d => d.date)
            .join(
                enter => this.enterMarkers(enter),
                null,
                exit => this.removeMarkers(exit)
            ).transition(this.animSlow)
            .attr('cy', d => this.scaleRate(d.rate))
            .attr('cx', d => this.scaleDate(d.date))
        return this
    }

    removeMarkers(markers) {
        markers.transition(this.animSlow)
            .attr('cy', d => this.scaleRate(d.rate))
            .attr('cx', d => this.scaleDate(d.date))
            .attr('r', 0)
            .remove()
    }

    enterMarkers(markers) {
        const self = this
        return markers.append('circle')
            .classed('currency-marker', true)
            .attr('cy', d => this.scaleRate(d.rate))
            .attr('cx', d => this.scaleDate(d.date))
            .attr('fill', d => d3.color(color(d.setId)))
            .attr('r', 4)
            .attr('stroke', 'transparent')
            .attr('stroke-width', 4)
            .on('mouseover', function() {
                d3.select(this)
                    .interrupt()
                    .transition(self.animFast)
                    .attr('r', 8)
                    .attr('stroke-width', 0)
                self.props.animateFauxDOM(800)
            })
            .on('mouseout', function() {
                d3.select(this)
                    .interrupt()
                    .transition(self.animFast)
                    .attr('r', 4)
                    .attr('stroke-width', 4)
                self.props.animateFauxDOM(800)
            })
            .on('mouseover.aim', d => this.replaceAimLines(d))
    }

    replaceAimLines({rate}) {
        this.showAimLines()
        this.aimLineY
            .interrupt(self.animFast)
            .transition(this.animFast)
            .attr('x1', this.scaleDate.range()[1])
            .attr('x2', this.scaleDate.range()[0])
            .attr('y1', this.scaleRate(rate))
            .attr('y2', this.scaleRate(rate))
        this.props.animateFauxDOM(800)
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
