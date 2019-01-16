export default function () {
    let store = [];
    let itemType = context => undefined;

    function repeater(context) {
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
            .on('click', () => {
                store.push(null)
                addItem()
            })
        
        function addItem() {
            repeaterBox.selectAll('.repeater-box__item')
                .data(store)
                .enter()
                .append('div')
                    .classed('repeater-box__item', true)
                    .style('margin-bottom', '20px')
                    .call(context => {
                        context.call(itemType)
                    });
        }

    }
    repeater.itemType = function(_) {
        return itemType = typeof _ === 'function' ? _ : () => _, repeater;
    }
    repeater.store = function(_) {
        return store = _, repeater;
    }
    return repeater;
}
