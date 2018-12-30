import * as d3 from 'd3';
import {canvasFactory} from '../../lib/factory/canvas';

const dateFormat = d3.timeFormat("%d.%m.%Y");
const dateParseFormat = d3.timeParse("%d.%m.%Y");
const lineColor = d3.color('teal');
const markerColor = lineColor.darker(1);

const excangeRateWidget = async function(options, context) {
    const chart = canvasFactory(options, context);
    const svg = chart.svg;
    const dataset = (await (await fetch('/api/currency/R01235')).json())
            .map(item => ({
                ...item,
                date: dateParseFormat(item.date)
            }))
    const scaleRate = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d.rate)])
        .range([chart.bottomY, chart.topY]);
    const scaleDate = d3.scaleTime()
        .domain([d3.timeDay.offset(new Date(), -7), new Date()])
        .range([chart.leftX, chart.rightX]);

    const axisRate = d3.axisLeft()
        .scale(scaleRate);
    const axisDate = d3.axisBottom()
        .scale(scaleDate)
        .ticks(d3.timeDay.every(1))
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
