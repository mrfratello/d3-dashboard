import * as d3 from 'd3'
import axios from 'axios'


const dateFormat = d3.timeFormat("%d.%m.%Y")
const dateParseFormat = d3.timeParse("%d.%m.%Y")
const dateFieldParse = d3.timeParse("%Y-%m-%d")
const toDate = date => date instanceof Date ? date : dateFieldParse(date)

async function getCurrencyRate({id, period}) {
    return axios.get(`/api/currency/${id}`, {params: { 
            dateFrom: dateFormat(new Date(period.dateFrom)),
            dateTo: dateFormat(new Date(period.dateTo))
        }})
        .then(({data}) => ({
            id,
            set: data.map(item => ({
                ...item,
                rate: item.rate / item.nominal,
                date: dateParseFormat(item.date)
            }))
        }))
}

async function getCurrencyRateList({currencies, period}) {
    return Promise.all(
        currencies.filter(i => i.currency)
            .map(currency => getCurrencyRate({
                id: currency.currency, 
                period
            }))
    )
}

const exchangeRateChart = {
    height: 400,
    color: d3.scaleOrdinal().range(d3.schemeCategory10),

    constructor() {
        this.initScales()
            .initAxis()
            .initLines()
            .initAnimation()
    },

    async update(state) {
        if (!state.currencies.length 
            && !state.period.dateFrom 
            && !state.period.dateTo) {
            return
        }
        this.dataset = await getCurrencyRateList(state)
        this.updateScales(state.period)
            .updateAxis()
            .updateLines()
    },

    initScales() {
        this.scaleRate = d3.scaleLinear()
            .range([this.bottomY, this.topY]);
        this.scaleDate = d3.scaleTime()
            .range([this.leftX, this.rightX]);
        return this
    },

    initAxis() {
        this.axisRateFn = d3.axisLeft()
        this.axisDateFn = d3.axisBottom()
            .tickFormat(dateFormat)
        this.axisRate = this.svg.append('g')
            .attr('transform', `translate(${this.leftX}, 0)`)
        this.axisDate = this.svg.append('g')
            .attr('transform', `translate(0, ${this.bottomY})`)
        return this
    },

    initLines() {
        this.lineFn = d3.line()
        this.linesContainer = this.svg.append('g')
            .classed('currency-line-container', true)
        this.markersContainer = this.svg.append('g')
            .classed('currency-markers', true)
        return this
    },


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
    },

    updateAxis() {
        this.axisRateFn.scale(this.scaleRate)
        const dateTicksCount = Math.min(d3.timeDay.count(...this.scaleDate.domain()), 10)
        this.axisDateFn.scale(this.scaleDate)
            .ticks(dateTicksCount)
        this.axisRate.transition()
            .duration(this.duration)
            .ease(this.ease)
            .call(this.axisRateFn)
        this.axisDate.transition()
            .duration(this.duration)
            .ease(this.ease)
            .call(this.axisDateFn)
        return this
    },

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
            .transition()
            .duration(this.duration)
            .ease(this.ease)
            .attr('d', d => this.lineFn(d))
        this.updateMarkerGroups()
        return this
    },

    enterLines(lines) {
        return lines.enter()
            .append('path')
            .classed('currency-line', true)
            .attr('fill', 'none')
            .attr('stroke', (d, i) => this.color(i))
            .attr('stroke-width', 1)
    },

    updateMarkerGroups() {
        const markerGroups = this.markersContainer.selectAll('.currency-markers__group')
            .data(this.dataset)
        markerGroups.exit().remove()
        const newMarkerGroups = markerGroups.enter()
            .append('g')
            .classed('currency-markers__group', true)
        this.updateMarkers(markerGroups.merge(newMarkerGroups))
    },

    updateMarkers(groups) {
        const markers = groups.selectAll('.currency-marker')
            .data((d, i) => d.set.map(item => ({
                ...item,
                i
            })), d => d.date)
        this.removeMarkers(markers)
        this.enterMarkers(markers)
        markers.transition()
            .duration(this.duration)
            .ease(this.ease)
            .attr('cy', d => this.scaleRate(d.rate))
            .attr('cx', d => this.scaleDate(d.date))
        return this
    },

    removeMarkers(markers) {
        markers.exit()
            .transition()
            .duration(this.duration)
            .ease(this.ease)
            .attr('cy', d => this.scaleRate(d.rate))
            .attr('cx', d => this.scaleDate(d.date))
            .attr('r', 0)
            .remove()
    },

    enterMarkers(markers) {
        return markers.enter()
            .append('circle')
            .classed('currency-marker', true)
            .attr('cy', d => this.scaleRate(d.rate))
            .attr('cx', d => this.scaleDate(d.date))
            .attr('fill', d => d3.color(this.color(d.i)).darker(1))
            .attr('r', 0)
            .transition()
            .duration(this.duration)
            .ease(this.ease)
            .attr('r', 4)
    }
}

export default exchangeRateChart
