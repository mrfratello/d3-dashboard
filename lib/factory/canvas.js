import * as d3 from 'd3';


export function canvasFactory(options, context) {
    context = context || d3.select('body');
    const defaultOptions = {
        width: context.node().clientWidth,
        height: context.node().clientHeight,
        margin: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10
        },
        padding: {
            top: 10,
            bottom: 10,
            left: 20,
            right: 20
        }
    };

    const canvas = Object.assign({}, defaultOptions, options);
    canvas.context = context;
    canvas.svg = context.append('svg')
        .attr('width', canvas.width)
        .attr('height', canvas.height);
    let margin = canvas.margin;
    let padding = canvas.padding;
    canvas.innerWidth = canvas.width - (margin.left + margin.right + padding.left + padding.right);
    canvas.innerHeight = canvas.height - (margin.top + margin.bottom + padding.top + padding.bottom);
    return canvas;
}