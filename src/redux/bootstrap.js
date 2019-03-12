import * as d3 from 'd3'
import { dateISO } from '../locale'


export default function bootstrap(orm) {
    const NOW = d3.timeDay.floor(new Date())
    const store = JSON.parse(localStorage.getItem('store')) || {}
    const state = Object.assign(orm.getEmptyState(), store)
    const session = orm.mutableSession(state)
    const { Widget, ExchangeRateWidget } = session

    if (!Widget.all().count()) {
        const exchangeRateWidget = Widget.create({ title: 'Курсы валют' })
        ExchangeRateWidget.create({
            dateFrom: dateISO.format(d3.timeDay.offset(NOW, -17)),
            dateTo: dateISO.format(NOW),
            widget: exchangeRateWidget
        })
    }
    return {
        ...state
    }
}
