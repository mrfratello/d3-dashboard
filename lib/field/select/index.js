import {MDCSelect} from '@material/select';
import './select.scss';


export default function() {
    let dataset = []
    let label = ''
    let selected = false
    let valueFn = d => d
    let optionFn = d => d
    let changeHandler = () => undefined

    function select(context) {
        const field = context.append('div')
            .classed('mdc-select mdc-select--outlined', true)
            .classed('select--full-width', true)
        field.append('i')
            .classed('mdc-select__dropdown-icon', true);
        const nativeField = field.append('select')
            .classed('mdc-select__native-control', true)
        nativeField.selectAll('option')
            .data(dataset)
            .enter()
            .append('option')
                .attr('value', valueFn)
                .property('selected', d => selected === valueFn(d))
                .text(optionFn);
        nativeField.insert('option', ':first-child')
            .attr('value', '')
            .property('selected', selected === false)
            .property('disabled', true);
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
        field.nodes()
            .forEach(element => {
                const MDCField = new MDCSelect(element);
                MDCField.listen(
                    'MDCSelect:change', 
                    () => changeHandler(
                        dataset[MDCField.selectedIndex - 1], 
                        MDCField.selectedIndex - 1, 
                        dataset
                    )
                );
            });
    }

    select.data = function(_) {
        return dataset = _, select;
    };

    select.label = function(_) {
        return label = _, select;
    };

    select.selected = function(_) {
        return selected = _, select;
    };

    select.value = function(_) {
        return valueFn = typeof _ === 'function' ? _ : () => _, select;
    };

    select.option = function(_) {
        return optionFn = typeof _ === 'function' ? _ : () => _, select;
    };

    select.on = function(eventName, _) {
        return changeHandler = _, select;
    };

    return select;
}
