import * as d3 from 'd3';
import {widgetFactory} from '../../lib/factory/widget';
import axios from 'axios';
import textfield from '../../lib/field/textfield'
import select from '../../lib/field/select';

const dateFormat = d3.timeFormat("%d.%m.%Y");
const dateParseFormat = d3.timeParse("%d.%m.%Y");
const dateParseDateField = d3.timeParse("%Y-%m-%d");
const lineColor = d3.color('teal');
const markerColor = lineColor.darker(1);

async function getCurrencyList() {
    return await axios.get(`/api/currency`)
        .then(({data}) => data)
}

async function getCurrencyRate(id, dateFrom, dateTo) {
    return (await axios.get(`/api/currency/${id}`, {params: { 
            dateFrom: dateFormat(dateFrom),
            dateTo: dateFormat(dateTo)
        }})
        .then(({data}) => data))
        .map(item => ({
            ...item,
            rate: item.rate / item.nominal,
            date: dateParseFormat(item.date)
        }))
}

const excangeRateWidget = async function(options, context) {
    const widget = widgetFactory(options, context);
    const {controls} = widget;

    const currencyList = await getCurrencyList();

    const currencyControl = select()
        .data(currencyList)
        .value(false)
        .option(({code='', name=''}) => `${code} ${name}`)
        .label('Валюта')
        .on('change', d => {
            currencyId = d.id
            updateCanvas(canvas, currencyId, dateFrom, dateTo)
        });
    const dateFromControl = textfield()
        .label('От')
        .type('date')
        .on('change', d => {
            dateFrom = dateParseDateField(d)
            updateCanvas(canvas, currencyId, dateFrom, dateTo)
        })
    const dateToControl = textfield()
        .label('До')
        .type('date')
        .on('change', d => {
            dateTo = dateParseDateField(d)
            updateCanvas(canvas, currencyId, dateFrom, dateTo)
        })

    controls.call(currencyControl)
        .call(dateFromControl)
        .call(dateToControl)
    const canvas = widget.appendChart();

    let currencyId = '';
    let dateFrom = dateParseFormat('14.05.2018');
    let dateTo = dateParseFormat('01.10.2018');

    canvas.initScales = function() {
        this.scaleRate = d3.scaleLinear()
            .range([this.bottomY, this.topY]);
        this.scaleDate = d3.scaleTime()
            .range([this.leftX, this.rightX]);
    }

    canvas.initAxis = function() {
        this.axisRateFn = d3.axisLeft()
        this.axisDateFn = d3.axisBottom()
            .tickFormat(dateFormat)
        this.axisRate = this.svg.append('g')
            .attr('transform', `translate(${this.leftX}, 0)`)
        this.axisDate = this.svg.append('g')
            .attr('transform', `translate(0, ${this.bottomY})`)
    }

    canvas.initLine = function() {
        this.lineFn = d3.line()
        this.line = this.svg.append('path')
            .attr('fill', 'none')
            .attr('stroke', lineColor)
            .attr('stroke-width', 1)
        this.markers = this.svg.append('g')
            .classed('markers', true)
    }

    canvas.initAnimation = function() {
        this.duration = 500;
        this.ease = d3.easeQuadInOut;
    }

    canvas.updateScales = function(dataset) {
        this.scaleRate.domain([0, d3.max(dataset, d => d.rate)])
        this.scaleDate.domain([dateFrom, dateTo]) // TODO
    }

    canvas.updateAxis = function() {
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
    }

    canvas.updateLine = function(dataset) {
        this.lineFn
            .x(d => this.scaleDate(d.date))
            .y(d => this.scaleRate(d.rate))
        this.line.datum(dataset)
            .transition()
            .duration(this.duration)
            .ease(this.ease)
            .attr('d', d => this.lineFn(d))
        const markers = this.markers.selectAll('.marker')
            .data(dataset, d => d.date)
        markers.exit()
            .transition()
            .duration(this.duration)
            .ease(this.ease)
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
    }

    canvas.initScales()
    canvas.initAxis()
    canvas.initLine()
    canvas.initAnimation()


};

async function updateCanvas(canvas, currency, dateFrom, dateTo) {
    const dataset = await getCurrencyRate(currency, dateFrom, dateTo)
    canvas.updateScales(dataset)
    canvas.updateAxis()
    canvas.updateLine(dataset)
}

export default excangeRateWidget;
