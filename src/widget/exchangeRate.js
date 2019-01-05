import * as d3 from 'd3';
import {widgetFactory} from '../../lib/factory/widget';
import axios from 'axios';
import select from '../../lib/field/select';

const dateFormat = d3.timeFormat("%d.%m.%Y");
const dateParseFormat = d3.timeParse("%d.%m.%Y");
const lineColor = d3.color('teal');
const markerColor = lineColor.darker(1);

async function getCurrencyList() {
    return await axios.get(`/api/currency`)
        .then(({data}) => data)
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
        .on('change', d => console.log(d));
    controls.call(currencyControl);
    const dateFromControl = controls.append('input')
        .attr('type', 'date')
        .attr('placeholder', 'дата начала');
    const dateToControl = controls.append('input')
        .attr('type', 'date')
        .attr('placeholder', 'дата окончания');

    const canvas = widget.appendChart();
    const svg = canvas.svg;

    // const currencyId = currencyControl.property('value');
    const currencyId = 'R01235';
    const dateFrom = dateParseFormat('14.05.2018');
    const dateTo = dateParseFormat('01.10.2018');
    const params = {
        dateFrom: dateFormat(dateFrom),
        dateTo: dateFormat(dateTo)
    };

    const dataset = (await axios.get(`/api/currency/${currencyId}`, {params})
        .then(({data}) => data))
        .map(item => ({
            ...item,
            date: dateParseFormat(item.date)
        }))

    const scaleRate = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d.rate)])
        .range([canvas.bottomY, canvas.topY]);
    const scaleDate = d3.scaleTime()
        .domain([dateFrom, dateTo])
        .range([canvas.leftX, canvas.rightX]);
    const dateTicksCount = Math.min(d3.timeDay.count(...scaleDate.domain()), 10);
    const axisRate = d3.axisLeft()
        .scale(scaleRate);
    const axisDate = d3.axisBottom()
        .scale(scaleDate)
        .ticks(dateTicksCount)
        .tickFormat(dateFormat);

    const line = d3.line()
        .x(d => scaleDate(d.date))
        .y(d => scaleRate(d.rate));

    svg.append('g')
        .attr('transform', `translate(${canvas.leftX}, 0)`)
        .call(axisRate);
    svg.append('g')
        .attr('transform', `translate(0, ${canvas.bottomY})`)
        .call(axisDate);
    svg.append('path')
        .datum(dataset)
        .attr('d', d => line(d))
        .attr('fill', 'none')
        .attr('stroke', lineColor)
        .attr('stroke-width', 1);
    svg.append('g')
        .classed('markers', true)
        .selectAll('.marker')
            .data(dataset)
            .enter()
            .append('circle')
            .classed('marker', true)
            .attr('r', 4)
            .attr('cy', d => scaleRate(d.rate))
            .attr('cx', d => scaleDate(d.date))
            .attr('fill', markerColor);
};

export default excangeRateWidget;
