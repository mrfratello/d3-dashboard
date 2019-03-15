import { Model, attr, oneToOne, fk } from 'redux-orm'
import { 
    EXCHANGE_RATE_WIDGET_UPDATE,
    EXCHANGE_RATE_WIDGET_UPDATE_CURRENCY 
} from '../action/types'


export class ExchangeRateWidget extends Model {
    static get fields() {
        return {
            id: attr(),
            widget: oneToOne('Widget', 'type'),
            dateFrom: attr(),
            dateTo: attr(),
            // currency: fk('Currency', 'exchangeRateWidgets')
        }
    }

    toJson() {
        return {
            ...this.ref,
            type: 'ExchangeRateWidget',
            currency: this.currency ? this.currency.toJson : null
        }
    }
    static reducer({type, payload}, ExchangeRateWidget) {
        switch (type) {
            case EXCHANGE_RATE_WIDGET_UPDATE:
                ExchangeRateWidget.withId(payload.id).update(payload)
                break
            case EXCHANGE_RATE_WIDGET_UPDATE_CURRENCY:
                ExchangeRateWidget.withId(payload.id).currency = payload.currencyId
                break
        }
    }
}
ExchangeRateWidget.modelName = 'ExchangeRateWidget'

export default ExchangeRateWidget
