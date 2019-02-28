import './button.scss'

export default function() {
    let label = 'Button'
    let icon = 'add'
    let type = 'button'
    let clickHandler = () => undefined;


    function button(context) {
        const nativeButton = context.append('button')
                .classed('mdc-button', true)
                .classed('mdc-button--unelevated', true)
                .classed('mdc-button--dense', true)
                .attr('type', type)
                .on('click', () => clickHandler())
        nativeButton.append('i')
            .classed('mdc-button__icon', true)
            .classed('material-icons', true)
            .attr('area-hidden', true)
            .text(icon)
        nativeButton.append('span')
            .classed('mdc-button__label', true)
            .html(label)
    }
    button.label = function(_) {
        return label = _, button
    }
    button.icon = function(_) {
        return icon = _, button
    }
    button.on = function(eventName, _) {
        return clickHandler = _, button
    }
    return button
}