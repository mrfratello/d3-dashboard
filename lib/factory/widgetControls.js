import * as d3 from 'd3';


export function widgetControlsFactory(context) {
    const box = context.append('div')
        .classed('mdc-layout-grid', true)
    const row = box.append('div')
        .classed('mdc-layout-grid__inner', true)
    box.addControl = function(componentFn, desktopSize=4) {
        row.append('div')
            .classed('mdc-layout-grid__cell', true)
            .classed(`mdc-layout-grid__cell--span-${desktopSize}-desktop`, true)
            .call(componentFn)
        return box
    }
    return box
}