import * as d3 from 'd3'
import button from '../../button/button'
import buttonIcon from '../../button/icon/icon'


export default function Repeater () {
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

export function repeaterItem() {
    let content = context => undefined
    let injectedEvents = []

    function RepeaterItem(context) {
        const itemBox = context.append('div')
            .classed('repeater-item-box', true)
        itemBox.call(content)
        const removeButton = buttonIcon()
            .icon('remove_circle')
            .on('click', function(d) {
                d3.select(this).dispatch('remove-repeater-item', {
                    bubbles: true,
                    detail: d
                })
            })
        itemBox.call(removeButton)
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
