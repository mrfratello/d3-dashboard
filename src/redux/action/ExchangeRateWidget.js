import {
    EXCHANGE_RATE_WIDGET_UPDATE,
    EXCHANGE_RATE_WIDGET_UPDATE_CURRENCY,
    EXCHANGE_RATE_WIDGET_ADD_CURRENCY_ITEM,
    EXCHANGE_RATE_WIDGET_REMOVE_CURRENCY_ITEM,
    EXCHANGE_RATE_CHART_DATA_UPDATE
} from './types'
import { fetchCurrencyRate } from './Currency'


export const exchangeRateWidgetUpdate = payload => ({
        type: EXCHANGE_RATE_WIDGET_UPDATE,
        payload
    })

export const exchangeRateWidgetUpdateCurrency = payload => ({
        type: EXCHANGE_RATE_WIDGET_UPDATE_CURRENCY,
        payload
    })

export const addCurrencyItem = payload => ({
        type: EXCHANGE_RATE_WIDGET_ADD_CURRENCY_ITEM,
        payload
    })

export const removeCurrencyItem = payload => ({
        type: EXCHANGE_RATE_WIDGET_REMOVE_CURRENCY_ITEM,
        payload
    })

export const updateChartData = data => ({
        type: EXCHANGE_RATE_CHART_DATA_UPDATE,
        data
})

export const fetchCurrencyRateList = (ExchangeRateWidget) => dispatch =>
    Promise.all(
        ExchangeRateWidget.currencies
            .filter(i => i.currency)
            .map(({currency, id}) => fetchCurrencyRate({
                ...currency,
                itemId: id,
                dateFrom: ExchangeRateWidget.dateFrom,
                dateTo: ExchangeRateWidget.dateTo
            }))
    )
    .then(data => dispatch(updateChartData(data)))
