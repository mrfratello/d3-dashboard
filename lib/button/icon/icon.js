import './icon.scss'

export default function() {
    let icon = 'add'
    let type = 'button'
    let clickHandler = () => undefined;


    function button(context) {
        const nativeButton = context.append('button')
                .classed('mdc-icon-button', true)
                .attr('type', type)
                .attr('area-hidden', true)
                .attr('area-pressed', false)
                .on('click', clickHandler)
        nativeButton.append('i')
            .classed('mdc-icon-button__icon', true)
            .classed('material-icons', true)
            .attr('area-hidden', true)
            .text(icon)
    }
    button.icon = function(_) {
        return icon = _, button
    }
    button.on = function(eventName, _) {
        return clickHandler = _, button
    }
    return button
}