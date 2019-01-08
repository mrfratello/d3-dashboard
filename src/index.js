import * as d3 from 'd3'
import excangeRate from './widget/exchangeRate'
import './store'
import './main.scss'
window.d3 = d3;

d3.select('body')
    .classed('mdc-typography', true)

const chart = excangeRate({
    height: window.innerHeight,
    width: window.innerWidth,
    title: 'Курс валют'
})
