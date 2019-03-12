import * as d3 from 'd3'
import { dateISO } from '../locale'


export default function bootstrap(orm) {
    const NOW = d3.timeDay.floor(new Date())
    const store = JSON.parse(localStorage.getItem('store')) || {}
    const state = Object.assign(orm.getEmptyState(), store)
    const session = orm.mutableSession(state)
    const { Widget, ExchangeRateWidget, Currency } = session

    if (!Widget.all().count()) {
        const exchangeRateWidget = Widget.create({ title: 'Курсы валют' })
        const exchangeRate = ExchangeRateWidget.create({
                dateFrom: dateISO.format(d3.timeDay.offset(NOW, -17)),
                dateTo: dateISO.format(NOW),
                widget: exchangeRateWidget
            })
        const currency = Currency.create({
            currency: 'R01235',
            code: 'USD',
            name: 'Доллар США'
        })
        exchangeRate.currencies.add(currency)
    }
    return {
        ...state
    }
}
