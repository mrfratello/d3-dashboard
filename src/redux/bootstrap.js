import * as d3 from 'd3'
import { dateISO } from '../locale'


export default function bootstrap(schema) {
    const NOW = d3.timeDay.floor(new Date())
    const store = JSON.parse(localStorage.getItem('store')) || {}
    const state = Object.assign(schema.getEmptyState(), store)
    const session = schema.mutableSession(state)
    const { Widget, ExchangeRateWidget, ExchangeRateCarrency } = session

    if (!Widget.all().count()) {
        const exchangeRateWidget = Widget.create({ title: 'Курсы валют' })
        const exchangeRate = ExchangeRateWidget.create({
                dateFrom: dateISO.format(d3.timeDay.offset(NOW, -17)),
                dateTo: dateISO.format(NOW),
                widget: exchangeRateWidget
            })
        ExchangeRateCarrency.create({
            currency: 'R01235',
            code: 'USD',
            name: 'Доллар США',
            exchangeRate: exchangeRate
        })
    }
    return {
        ...state
    }
}
