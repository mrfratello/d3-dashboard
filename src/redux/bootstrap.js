import * as d3 from 'd3'
import { dateISO } from '../locale'
import { dbStateSelector } from './selectors'


export default function bootstrap(orm) {
    const NOW = d3.timeDay.floor(new Date())
    const store = JSON.parse(localStorage.getItem('store')) || {}
    const state = Object.assign({ orm: orm.getEmptyState() }, store)
    const session = orm.mutableSession(dbStateSelector(state))
    const { Widget, ExchangeRateWidget, ExchangeRateCurrency } = session

    if (!Widget.all().count()) {
        const exchangeRateWidget = ExchangeRateWidget.create({
            dateFrom: dateISO.format(d3.timeDay.offset(NOW, -17)),
            dateTo: dateISO.format(NOW),
            widget: Widget.create({
                title: 'Курсы валют',
                w: 4,
                h: 12
            })
        })
        ExchangeRateCurrency.create({
            widget: exchangeRateWidget
        })
    }
    return {
        ...state
    }
}
