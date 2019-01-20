import * as d3 from 'd3'


export default function Repeater () {
    const listener = d3.dispatch('update')
    let store = []
    let key = (d, i) => i
    let itemType = context => undefined
    let onAppendItem = store => {
        store.push(null)
        listener.call('update', null, store)
    }

    function repeater(context, listener=listener) {
        const repeaterBox = context.append('div')
            .classed('repeater-box', true)

        repeaterBox.selectAll('.repeater-box__item')
            .data(store, key)
            .enter()
            .append('div')
                .classed('repeater-box__item', true)
                .style('margin-bottom', '20px')
                .call(context => context.call(itemType))
        context.append('button')
            .classed('repeater-box__adder', true)
            .attr('type', 'button')
            .html('Добавить')
            .on('click', () => onAppendItem())
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
    repeater.itemType = function(_) {
        return itemType = typeof _ === 'function' ? _ : () => _, repeater
    }
    repeater.store = function(_) {
        return store = _, repeater
    }
    repeater.key = function(_) {
        return key = typeof _ === 'function' ? _ : () => _, repeater
    }
    repeater.onAppendItem = function(_) {
        return onAppendItem = typeof _ === 'function' ? _ : () => _, repeater
    }
    return repeater
}

export function repeaterItem() {
    let content = context => undefined

    function RepeaterItem(context) {
        const itemBox = context.append('div')
            .classed('repeater-item-box', true)
        itemBox.call(content)
        itemBox.append('button')
            .attr('type', 'button')
            .html('удалить')
            .on('click', function(d) {
                d3.select(this).dispatch('remove-repeater-item', {
                    bubbles: true,
                    detail: d
                })
            })
        itemBox.on('select-change', function(d) {
            const e = d3.event
            if (e.target === this) {
                return false
            }
            e.stopPropagation()
            const data = Object.assign({}, {item: e.detail}, d)
            d3.select(this).dispatch('select-change', {
                bubbles: true,
                detail: data
            })
        })
    }   
    RepeaterItem.content = function(_) {
        return content = typeof _ === 'function' ? _ : () => _, RepeaterItem
    }
    return RepeaterItem
}
