import * as d3 from 'd3'
import {widgetFactory} from '../../lib/factory/widget'
import axios from 'axios'
import textfield from '../../lib/field/textfield'
import select from '../../lib/field/select'
import store from '../store'
import {changeCurrency, changeDateFrom, changeDateTo} from '../store/action'

const dateFormat = d3.timeFormat("%d.%m.%Y")
const dateParseFormat = d3.timeParse("%d.%m.%Y")
const dateFieldParse = d3.timeParse("%Y-%m-%d")
const toDate = date => date instanceof Date ? date : dateFieldParse(date)
const lineColor = d3.color('teal');
const markerColor = lineColor.darker(1);

async function getCurrencyList() {
    return await axios.get(`/api/currency`)
        .then(({data}) => data)
}

async function getCurrencyRate({id, dateFrom, dateTo}) {
    return (await axios.get(`/api/currency/${id}`, {params: { 
            dateFrom: dateFormat(new Date(dateFrom)),
            dateTo: dateFormat(new Date(dateTo))
        }})
        .then(({data}) => data))
        .map(item => ({
            ...item,
            rate: item.rate / item.nominal,
            date: dateParseFormat(item.date)
        }))
}

const exchangeRateCanvas = {
    constructor() {
        this.initScales()
            .initAxis()
            .initLine()
            .initAnimation()
    },

    async update(state) {
        if (!state.id && !state.dateFrom && !state.dateTo) {
            return
        }
        this.dataset = await getCurrencyRate(state)
        this.updateScales(state)
            .updateAxis()
            .updateLine()
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

    initLine() {
        this.lineFn = d3.line()
        this.line = this.svg.append('path')
            .attr('fill', 'none')
            .attr('stroke', lineColor)
            .attr('stroke-width', 1)
        this.markers = this.svg.append('g')
            .classed('markers', true)
        return this
    },


    updateScales({dateFrom, dateTo}) {
        let [minRate, maxRate] = d3.extent(this.dataset, d => d.rate)
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
        const dateTicksCount = Math.min(d3.timeDay.count(...this.scaleDate.domain()), 10);
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

    updateLine() {
        this.lineFn
            .x(d => this.scaleDate(d.date))
            .y(d => this.scaleRate(d.rate))
        this.line.datum(this.dataset)
            .transition()
            .duration(this.duration)
            .ease(this.ease)
            .attr('d', d => this.lineFn(d))
        const markers = this.markers.selectAll('.marker')
            .data(this.dataset, d => d.date)
        markers.exit()
            .transition()
            .duration(this.duration)
            .ease(this.ease)
            .attr('cy', d => this.scaleRate(d.rate))
            .attr('cx', d => this.scaleDate(d.date))
            .attr('r', 0)
            .remove()
        markers.enter()
            .append('circle')
            .classed('marker', true)
            .attr('cy', d => this.scaleRate(d.rate))
            .attr('cx', d => this.scaleDate(d.date))
            .attr('fill', markerColor)
            .attr('r', 0)
            .transition()
            .duration(this.duration)
            .ease(this.ease)
            .attr('r', 4)
        markers.transition()
            .duration(this.duration)
            .ease(this.ease)
            .attr('cy', d => this.scaleRate(d.rate))
            .attr('cx', d => this.scaleDate(d.date))
        return this
    }
}

const excangeRateWidget = async function(options, context) {
    const widget = widgetFactory(options, context);
    const {controls} = widget;

    const currencyList = await getCurrencyList()
    const initialState = store.getState()

    const currencyControl = select()
        .data(currencyList)
        .value(d => d.id)
        .option(({code='', name=''}) => `${code} ${name}`)
        .label('Валюта')
        .selected(initialState.id)
        .on('change', ({id}) => store.dispatch(changeCurrency(id)))
    const dateFromControl = textfield()
        .label('От')
        .type('date')
        .value(initialState.dateFrom)
        .on('change', dateFrom => store.dispatch(changeDateFrom(dateFrom)))
    const dateToControl = textfield()
        .label('До')
        .type('date')
        .value(initialState.dateTo)
        .on('change', dateTo => store.dispatch(changeDateTo(dateTo)))

    controls.addControl(dateFromControl)
        .addControl(dateToControl)
        .addControl(currencyControl, 6)
    
    const canvas = widget.appendChart(exchangeRateCanvas)
    const unsubscribe = store.subscribe(() => canvas.update(store.getState()))
    canvas.update(initialState)
}

export default excangeRateWidget;
