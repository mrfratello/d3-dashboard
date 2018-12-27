import {canvasFactory} from '../lib/factory/canvas';
import * as d3 from 'd3';
window.d3 = d3;

const dataset = [1,2,3,4,5];

const chart = canvasFactory({
    height: window.innerHeight,
    width: window.innerWidth
});

chart.svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('r', 5)
    .attr('cx', d => d * 10)
    .attr('cy', d => d * 10);