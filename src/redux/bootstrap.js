import * as d3 from 'd3'


const dateFieldFormat = d3.timeFormat("%Y-%m-%d")
const NOW = d3.timeDay.floor(new Date())

export default function bootstrap(schema) {
    const store = JSON.parse(localStorage.getItem('store')) || {}
    const state = Object.assign(schema.getEmptyState(), store)
    const session = schema.mutableSession(state)
    const { Widget, ExchangeRateWidget, ExchangeRateCarrency } = session

    if (!Widget.all().count()) {
        const exchangeRateWidget = Widget.create({ title: 'Курсы валют' })
        const exchangeRate = ExchangeRateWidget.create({
                dateFrom: dateFieldFormat(d3.timeDay.offset(NOW, -17)),
                dateTo: dateFieldFormat(NOW),
                widget: exchangeRateWidget
            })
        ExchangeRateCarrency.create({
            currency: 'R01235',
            code: 'USD',
            name: 'Доллар США',
            exchangeRate: exchangeRate
        })

        Widget.create({ title: 'world' })
    }
    return {
        ...state
    }
}
