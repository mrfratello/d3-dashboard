import * as d3 from 'd3'
import debounce from 'lodash.debounce'
import { dateGOSTR, dateISO } from '../../../locale'
import color from '../color'


const toDate = date => date instanceof Date ? date : dateISO.parse(date)

export class ExchangeRateChartRefresher {

    constructor(self) {
        this.self = self
        this.replaceAimLines = debounce(this.replaceAimLines, 100)
    }

    updateChart() {
        const self = this.self
        const faux = self.props.connectFauxDOM('svg', 'chart')
        self.svg = d3.select(faux)
        this.dataset = self.props.data.slice()
        self.hideAimLines()
        this.updateScales()
            .updateAxis()
            .updateLines()
    }

    updateScales() {
        if (!this.dataset.length) {
            return this
        }
        const self = this.self
        const {dateFrom, dateTo} = self.extractPeriod(self.props.periods)
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
        self.scaleRate.domain([minRate, maxRate])
        self.scaleDate.domain(dateDomain)
        return this
    }

    updateAxis() {
        const self = this.self
        const axisRateFn = d3.axisLeft()
            .scale(self.scaleRate)
        self.axisRate
            .transition(self.animSlow)
            .call(axisRateFn)

        const dateTicksCount = Math.min(d3.timeDay.count(...self.scaleDate.domain()), 10)
        const axisDateFn = d3.axisBottom()
            .scale(self.scaleDate)
            .tickFormat(dateGOSTR.format)
            .ticks(dateTicksCount)
        self.axisDate
            .transition(self.animSlow)
            .call(axisDateFn)
        self.props.animateFauxDOM(800)
        return this
    }

    updateLines() {
        const self = this.self
        self.lineFn
            .x(d => self.scaleDate(d.date))
            .y(d => self.scaleRate(d.rate))
        self.linesContainer.selectAll('.currency-line')
            .data(this.dataset, d => d.id)
            .join(enter => this.enterLines(enter))
            .transition(self.animSlow)
            .attr('d', d => self.lineFn(d.set))
        self.props.animateFauxDOM(800)
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
        const self = this.self
        const markerGroups = self.markersContainer
            .selectAll('.currency-markers__group')
            .data(this.dataset, d => d.id)
            .join(enter => enter.append('g').classed('currency-markers__group', true))
        this.updateMarkers(markerGroups)
        self.props.animateFauxDOM(800)
        return this
    }

    updateMarkers(groups) {
        const self = this.self
        groups.selectAll('.currency-marker')
            .data(d => d.set.map(item => ({
                ...item,
                setId: d.id
            })), d => d.date)
            .join(
                enter => this.enterMarkers(enter),
                null,
                exit => this.removeMarkers(exit)
            ).transition(self.animSlow)
            .attr('cy', d => self.scaleRate(d.rate))
            .attr('cx', d => self.scaleDate(d.date))
        return this
    }

    removeMarkers(markers) {
        const self = this.self
        markers.transition(self.animSlow)
            .attr('cy', d => self.scaleRate(d.rate))
            .attr('cx', d => self.scaleDate(d.date))
            .attr('r', 0)
            .remove()
    }

    enterMarkers(markers) {
        const self = this.self
        return markers.append('circle')
            .classed('currency-marker', true)
            .attr('cy', d => self.scaleRate(d.rate))
            .attr('cx', d => self.scaleDate(d.date))
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
        const self = this.self
        self.showAimLines()
        self.aimLineY
            .interrupt(self.animFast)
            .transition(self.animFast)
            .attr('x1', self.scaleDate.range()[1])
            .attr('x2', self.scaleDate.range()[0])
            .attr('y1', self.scaleRate(rate))
            .attr('y2', self.scaleRate(rate))
        self.props.animateFauxDOM(800)
    }
}

export default ExchangeRateChartRefresher
