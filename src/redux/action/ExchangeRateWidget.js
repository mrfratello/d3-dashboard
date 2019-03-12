import { 
    EXCHANGE_RATE_WIDGET_UPDATE,
    EXCHANGE_RATE_WIDGET_UPDATE_CURRENCY
} from './types' 


export const exchangeRateWidgetUpdate = payload => ({
        type: EXCHANGE_RATE_WIDGET_UPDATE,
        payload
    })

export const exchangeRateWidgetUpdateCurrency = payload => ({
        type: EXCHANGE_RATE_WIDGET_UPDATE_CURRENCY,
        payload
    })
