import { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { connect } from 'react-redux'
import { withFauxDOM } from 'react-faux-dom'
import debounce from 'lodash.debounce'
import { exchangeRateChartData } from '../../../redux/selectors'
import { dateGOSTR } from '../../../locale'
import './Chart.scss'


const toDate = date => date instanceof Date ? date : dateGOSTR.parse(date)

class ExchangeRateChart extends Component {

    constructor(props) {
        super(props)
        this.animSlow = d3.transition()
            .duration(500)
            .ease(d3.easeQuadInOut)
        this.animFast =  d3.transition()
            .duration(100)
            .ease(d3.easeQuadInOut)
        this.color = d3.scaleOrdinal().range(d3.schemeCategory10)

        const {width, height, margin, padding} = this.props
        this.innerWidth = width - (margin.left + margin.right + padding.left + padding.right);
        this.innerHeight = height - (margin.top + margin.bottom + padding.top + padding.bottom);
        this.leftX = margin.left + padding.left;
        this.rightX = this.leftX + this.innerWidth;
        this.topY = margin.top + padding.top;
        this.bottomY = this.topY + this.innerHeight;
        this.updateData = debounce(this.updateData, 500)
    }

    componentDidMount() {
        const faux = this.props.connectFauxDOM('svg', 'chart')
        this.svg = d3.select(faux)
                .attr('id', 'chart')
                .attr('width', this.props.width)
                .attr('height', this.props.height)
        this.initScales()
            .initAxis()
            // .initAim()
            .initLines()
            // .initLegend()
        this.props.animateFauxDOM(800)
        if (this.props.data) {
            this.updateData()
        }
    }

    initScales() {
        this.scaleRate = d3.scaleLinear()
            .range([this.bottomY, this.topY])
        this.scaleDate = d3.scaleTime()
            .range([this.leftX, this.rightX])
        return this
    }

    initAxis() {
        this.axisRateFn = d3.axisLeft()
        this.axisDateFn = d3.axisBottom()
            .tickFormat(dateGOSTR.format)
        this.axisRate = this.svg.append('g')
            .attr('transform', `translate(${this.leftX}, 0)`)
        this.axisDate = this.svg.append('g')
            .attr('transform', `translate(0, ${this.bottomY})`)
        return this
    }

    initLines() {
        this.lineFn = d3.line()
        this.linesContainer = this.svg.append('g')
            .classed('currency-line-container', true)
        this.markersContainer = this.svg.append('g')
            .classed('currency-markers', true)
        return this
    }

    componentDidUpdate(prevProps) {
        // if (!state.currencies.length 
        //     && !state.period.dateFrom 
        //     && !state.period.dateTo) {
        //     return
        // }
        if (this.props.data !== prevProps.data) {
            this.updateData()
        }

    }

    updateData() {
        const period = {
            dateFrom: '27.02.2019',
            dateTo: '16.03.2019'
        }
        this.dataset = this.props.data.slice()
        this.updateScales(period)
            .updateAxis()
            .updateLines()
            // .updateLegend()
        this.props.animateFauxDOM(800)
    }

    updateScales({dateFrom, dateTo}) {
        if (!this.dataset.length) {
            return this
        }
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
        this.axisRateFn.scale(this.scaleRate)
        const dateTicksCount = Math.min(d3.timeDay.count(...this.scaleDate.domain()), 10)
        this.axisDateFn.scale(this.scaleDate)
            .ticks(dateTicksCount)
        this.axisRate.transition(this.animSlow)
            .call(this.axisRateFn)
        this.axisDate.transition(this.animSlow)
            .call(this.axisDateFn)
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
        const {width, height} = this.props
        return <Fragment>
            { this.props.chart }
        </Fragment>
        return <svg width={width} height={height}>
                { this.props.chart }
            </svg>
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
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.object,
    padding: PropTypes.object
}

export default connect( 
        state => ({ data: exchangeRateChartData(state) }) 
    )(withFauxDOM(ExchangeRateChart))
