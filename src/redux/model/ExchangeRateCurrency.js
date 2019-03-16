import { Model, attr, fk } from 'redux-orm'
import {
    EXCHANGE_RATE_WIDGET_UPDATE_CURRENCY,
    EXCHANGE_RATE_WIDGET_REMOVE_CURRENCY_ITEM
} from '../action/types'


export class ExchangeRateCurrency extends Model {
    static get fields() {
        return {
            id: attr(),
            widget: fk('ExchangeRateWidget', 'currencies'),
            currency: fk('Currency')
        }
    }

    toJson() {
        return {
            ...this.ref,
            currency: this.currency ? this.currency.ref : null
        }
    }
    static reducer({type, payload}, ExchangeRateCurrency) {
        switch (type) {
            case EXCHANGE_RATE_WIDGET_UPDATE_CURRENCY:
                ExchangeRateCurrency.withId(payload.id).currency = payload.currencyId
                break
            case EXCHANGE_RATE_WIDGET_REMOVE_CURRENCY_ITEM:
                ExchangeRateCurrency.withId(payload.id).delete()
                break
        }
    }
}
ExchangeRateCurrency.modelName = 'ExchangeRateCurrency'

export default ExchangeRateCurrency
