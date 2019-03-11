import * as d3 from 'd3'


export const dateISO = {
    parse: d3.timeParse('%Y-%m-%d'),
    format: d3.timeFormat('%Y-%m-%d')
}