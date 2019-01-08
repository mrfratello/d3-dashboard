import {MDCTextField} from '@material/textfield'
import './textfield.scss'


export default function() {
    let label = ''
    let type = 'text'
    let value = ''
    let changeHandler = () => undefined;

    function textfield(context) {
        const field = context.append('div')
            .classed('mdc-text-field mdc-text-field--outlined', true);
        const nativeField = field.append('input')
            .classed('mdc-text-field__input', true)
            .attr('type', type)
            .property('value', value);
        const outline = field.append('div')
            .classed('mdc-notched-outline', true);
        outline.append('div')
            .classed('mdc-notched-outline__leading', true);
        outline.append('div')
            .classed('mdc-notched-outline__notch', true)
            .append('label')
                .classed('mdc-floating-label', true)
                .html(label);
        outline.append('div')
            .classed('mdc-notched-outline__trailing', true);
        const MDCField = new MDCTextField(field.node())
        nativeField.on('change', () => changeHandler(MDCField.value))
    }

    textfield.label = function(_) {
        return label = _, textfield;
    }

    textfield.value = function(_) {
        return value = _, textfield;
    }
    
    textfield.type = function(_) {
        return type = _, textfield;
    }

    textfield.on = function(eventName, _) {
        return changeHandler = _, textfield;
    }

    return textfield
}