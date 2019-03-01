import * as d3 from 'd3'
import button from '../../button/button'


export default function Repeater() {
    const listener = d3.dispatch('update')
    let store = []
    let key = (d, i) => i
    let itemType = context => undefined
    let onAppendItem = store => {
        store.push(null)
        listener.call('update', null, store)
    }

    function Repeater(context, listener=listener) {
        const repeaterBox = context.append('div')
            .classed('repeater-box', true)

        repeaterBox.selectAll('.repeater-box__item')
            .data(store, key)
            .enter()
            .append('div')
                .classed('repeater-box__item', true)
                .classed('mdc-layout-grid__inner', true)
                .style('margin-bottom', '20px')
                .call(context => context.call(itemType))
        const addButton = button()
            .label('Добавить')
            .icon('add')
            .on('click', () => onAppendItem())
        context.call(d => addButton(d))
        listener.on('update', store => {
            const items = repeaterBox.selectAll('.repeater-box__item')
                .data(store, key)
            items.enter().append('div')
                .classed('repeater-box__item', true)
                .classed('mdc-layout-grid__inner', true)
                .style('margin-bottom', '20px')
                .call(context => context.call(itemType))
            items.exit().remove()
        })
    }
    Repeater.itemType = function(_) {
        return itemType = typeof _ === 'function' ? _ : () => _, Repeater
    }
    Repeater.store = function(_) {
        return store = _, Repeater
    }
    Repeater.key = function(_) {
        return key = typeof _ === 'function' ? _ : () => _, Repeater
    }
    Repeater.onAppendItem = function(_) {
        return onAppendItem = typeof _ === 'function' ? _ : () => _, Repeater
    }
    return Repeater
}
