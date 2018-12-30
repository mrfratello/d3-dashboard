import * as d3 from 'd3';
import {canvasFactory} from '../../lib/factory/canvas';
import axios from 'axios';

const dateFormat = d3.timeFormat("%d.%m.%Y");
const dateParseFormat = d3.timeParse("%d.%m.%Y");
const lineColor = d3.color('teal');
const markerColor = lineColor.darker(1);

const excangeRateWidget = async function(options, context) {
    const chart = canvasFactory(options, context);
    const svg = chart.svg;

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
        .range([chart.bottomY, chart.topY]);
    const scaleDate = d3.scaleTime()
        .domain([dateFrom, dateTo])
        .range([chart.leftX, chart.rightX]);
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
        .attr('transform', `translate(${chart.leftX}, 0)`)
        .call(axisRate);
    svg.append('g')
        .attr('transform', `translate(0, ${chart.bottomY})`)
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
