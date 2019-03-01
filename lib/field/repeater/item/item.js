import * as d3 from 'd3'
import buttonIcon from '../../../button/icon/icon'


export default function repeaterItem() {
    let content = context => undefined
    let injectedEvents = []

    function RepeaterItem(context) {
        const itemBox = context.append('div')
            .classed('repeater-item-box', true)
            .classed('mdc-layout-grid__cell', true)
            .classed('mdc-layout-grid__cell--span-11-desktop', true)
        itemBox.call(content)
        const removeButton = buttonIcon()
            .icon('remove_circle')
            .on('click', function(d) {
                d3.select(this).dispatch('remove-repeater-item', {
                    bubbles: true,
                    detail: d
                })
            })
        context.append('div')
            .classed('repeater-item-box', true)
            .classed('mdc-layout-grid__cell', true)
            .classed('mdc-layout-grid__cell--span-1-desktop', true)
            .call(removeButton)
        injectedEvents.forEach(event =>
            itemBox.on(event, function(d) {
                const e = d3.event
                if (e.target === this) {
                    return false
                }
                e.stopPropagation()
                // TODO сделать настраиваемым key для вложенности данных дочернего события
                const data = Object.assign({}, {item: e.detail}, d)
                d3.select(this).dispatch(event, {
                    bubbles: true,
                    detail: data
                })
            })
        )
    }   
    RepeaterItem.content = function(_) {
        return content = typeof _ === 'function' ? _ : () => _, RepeaterItem
    }
    RepeaterItem.injectEvents = function(_) {
        return injectedEvents = Array.isArray(_) ? _ : [_], RepeaterItem
    }
    return RepeaterItem
}
