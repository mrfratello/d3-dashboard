import * as d3 from 'd3';
import {canvasFactory} from '../../lib/factory/canvas';
import exchangeRateUsaDollar from '../../data/exchangeRateUsaDollar.json';

const dateFormat = d3.timeFormat("%d.%m.%Y");
const dateParseFormat = d3.timeParse("%d.%m.%Y");
const lineColor = d3.color('teal');
const markerColor = lineColor.darker(1);

const excangeRateWidget = function(options, context) {
    const chart = canvasFactory(options, context);
    const svg = chart.svg;
    // fetch('http://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=02/03/2001&date_req2=14/03/2001&VAL_NM_RQ=R01235')
    //     .then(response => {
    //         console.log(response);
    //     })
    const dataset = convertDataset(exchangeRateUsaDollar);
    const scaleRate = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d.rate)])
        .range([chart.bottomY, chart.topY]);
    console.log(scaleRate.domain());
    const scaleDate = d3.scaleTime()
        .domain([new Date(2018, 10, 27), new Date(2018, 11, 27)])
        .range([chart.leftX, chart.rightX]);
    const line = d3.line()
            .x(d => scaleDate(d.date))
            .y(d => scaleRate(d.rate));

    const axisRate = d3.axisLeft()
        .scale(scaleRate);
    const axisDate = d3.axisBottom()
        .scale(scaleDate)
        .tickFormat(dateFormat);

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

const convertDataset = data => data.ValCurs.Record.map(d => ({
    date: dateParseFormat(d._Date),
    rate: parseFloat(d.Value.replace(',', '.'))
}));

export default excangeRateWidget;
