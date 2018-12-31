import * as d3 from 'd3';
import {canvasFactory} from './canvas';


export function widgetFactory(options, context) {
    context = context || d3.select('body');
    const defaultOptions = {
        width: context.node().clientWidth,
        height: context.node().clientHeight,
        title: 'Базовый виджет'
    };

    const widgetOptions = Object.assign({}, defaultOptions, options);
    const container = context.append('div')
        .style('height', `${widgetOptions.height}px`);
    const title = container.append('div')
        .classed('widget__title', true)
        .html(widgetOptions.title);
    const controls = container.append('div')
        .classed('widget__controls', true);
    const widget = Object.assign({}, widgetOptions, {
        container,
        title,
        controls
    });
    widget.appendChart = function(options = {}) {
        const chartHeight = widgetOptions.height - title.node().clientHeight - controls.node().clientHeight;
        widget.chart = container.append('div')
            .classed('widget__chart', true)
            .style('height', `${chartHeight}px`);
        widget.canvas = canvasFactory(options, widget.chart);
        return widget.canvas;
    };
    return widget;
}
