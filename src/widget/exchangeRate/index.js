import * as d3 from 'd3'
import {widgetFactory} from '../../../lib/factory/widget'
import axios from 'axios'
import textfield from '../../../lib/field/textfield'
import select from '../../../lib/field/select'
import repeater, {repeaterItem} from '../../../lib/field/repeater'
import store from '../../store'
import {
    addCurrency,
    removeCurrency,
    changeCurrency,
    changeDateFrom,
    changeDateTo
} from '../../store/action'
import exchangeRateChart from './chart'


async function getCurrencyList() {
    return axios.get(`/api/currency`)
        .then(({data}) => data)
}

const excangeRateWidget = async function(options, context) {
    const widget = widgetFactory(options, context);
    const {controls} = widget;

    const currencyList = await getCurrencyList()
    const initialState = store.getState()

    const currencyPicker = select()
        .data(currencyList)
        .value(d => d.id)
        .option(({code='', name=''}) => `${code} ${name}`)
        .label('Валюта')
        .selected(d => d.currency)
    const item = repeaterItem()
        .content(currencyPicker)
        .injectEvents('select-change')
    const currencyControl = repeater()
        .store(initialState.currencies)
        .itemType(item)
        .key(d => d.id)
        .onAppendItem(() => store.dispatch(addCurrency({currency:false})))
    const repeaterDispatch = d3.dispatch('update')
    const dateFromControl = textfield()
        .label('От')
        .type('date')
        .value(initialState.period.dateFrom)
        .on('change', dateFrom => store.dispatch(changeDateFrom(dateFrom)))
    const dateToControl = textfield()
        .label('До')
        .type('date')
        .value(initialState.period.dateTo)
        .on('change', dateTo => store.dispatch(changeDateTo(dateTo)))
    controls.addControl(dateFromControl)
        .addControl(dateToControl)
        .addControl(currencyControl, 8, repeaterDispatch)
        .on('remove-repeater-item', () => store.dispatch(removeCurrency(d3.event.detail.id)))
        .on('select-change', () => store.dispatch(changeCurrency(d3.event.detail.id, d3.event.detail.item.value)))
    
    const canvas = widget.appendChart(exchangeRateChart)
    store.subscribe(() => canvas.update(store.getState()))
    store.subscribe(() => repeaterDispatch.call('update', null, store.getState().currencies))
    canvas.update(initialState)
}

export default excangeRateWidget
