import * as d3 from 'd3'


export default function () {
    const dispatch = d3.dispatch('update')
    let store = []
    let itemType = context => undefined
    let onAppendItem = store => {
        store.push(null)
        dispatch.call('update', null, store)
    }

    function repeater(context, dispatch=dispatch) {
        const repeaterBox = context.append('div')
            .classed('repeater-box', true)

        repeaterBox.selectAll('.repeater-box__item')
            .data(store)
            .enter()
            .append('div')
                .classed('repeater-box__item', true)
                .style('margin-bottom', '20px')
                .call(context => {
                    context.call(itemType)
                })
        context.append('button')
            .classed('repeater-box__adder', true)
            .attr('type', 'button')
            .html('Добавить')
            .on('click', () => onAppendItem())
        dispatch.on('update', store => 
            repeaterBox.selectAll('.repeater-box__item')
                .data(store)
                .enter()
                .append('div')
                    .classed('repeater-box__item', true)
                    .style('margin-bottom', '20px')
                    .call(context => {
                        context.call(itemType)
                    })
        )
    }
    repeater.itemType = function(_) {
        return itemType = typeof _ === 'function' ? _ : () => _, repeater
    }
    repeater.store = function(_) {
        return store = _, repeater
    }
    repeater.onAppendItem = function(_) {
        return onAppendItem = typeof _ === 'function' ? _ : () => _, repeater
    }
    return repeater
}
