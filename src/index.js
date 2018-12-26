import * as d3 from 'd3';

const dataset = [1,2,3,4,5];

const body = d3.select('body');

const items = body.append('ui')
    .selectAll('li')
    .data(dataset)
    .enter()
    .append('li')
    .text(d => d);