import {
    EXCHANGE_RATE_WIDGET_UPDATE,
    EXCHANGE_RATE_WIDGET_UPDATE_CURRENCY,
    EXCHANGE_RATE_WIDGET_ADD_CURRENCY_ITEM,
    EXCHANGE_RATE_WIDGET_REMOVE_CURRENCY_ITEM
} from './types'


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