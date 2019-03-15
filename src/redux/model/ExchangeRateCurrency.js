import { Model, attr, fk } from 'redux-orm'
import { 
    EXCHANGE_RATE_WIDGET_UPDATE,
    EXCHANGE_RATE_WIDGET_UPDATE_CURRENCY 
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
    // static reducer({type, payload}, ExchangeRateWidget) {
    //     switch (type) {
    //         case EXCHANGE_RATE_WIDGET_UPDATE:
    //             ExchangeRateWidget.withId(payload.id).update(payload)
    //             break
    //         case EXCHANGE_RATE_WIDGET_UPDATE_CURRENCY:
    //             ExchangeRateWidget.withId(payload.id).currency = payload.currencyId
    //             break
    //     }
    // }
}
ExchangeRateCurrency.modelName = 'ExchangeRateCurrency'

export default ExchangeRateCurrency
