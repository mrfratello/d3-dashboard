import * as d3 from 'd3';
import excangeRate from './widget/exchangeRate';
import './main.scss';
window.d3 = d3;


const chart = excangeRate({
    height: window.innerHeight,
    width: window.innerWidth
});
