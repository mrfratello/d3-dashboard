import * as d3 from 'd3'


export const dateISO = {
    parse: d3.timeParse('%Y-%m-%d'),
    format: d3.timeFormat('%Y-%m-%d')
}

export const dateGOSTR = {
    parse: d3.timeParse('%d.%m.%Y'),
    format: d3.timeFormat('%d.%m.%Y')
}