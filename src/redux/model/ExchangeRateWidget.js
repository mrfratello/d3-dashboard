import { Model, attr, oneToOne, fk } from 'redux-orm'
import {
    EXCHANGE_RATE_WIDGET_UPDATE,
    EXCHANGE_RATE_WIDGET_ADD_CURRENCY_ITEM
} from '../action/types'


export class ExchangeRateWidget extends Model {
    static get fields() {
        return {
            id: attr(),
            widget: oneToOne('Widget', 'type'),
            dateFrom: attr(),
            dateTo: attr()
        }
    }

    toJson() {
        return {
            ...this.ref,
            type: 'ExchangeRateWidget',
            currencies: this.currencies
                ? this.currencies.toModelArray()
                    .map(currency => currency.toJson())
                : []
        }
    }
    static reducer({type, payload}, ExchangeRateWidget, session) {
        switch (type) {
            case EXCHANGE_RATE_WIDGET_UPDATE:
                ExchangeRateWidget.withId(payload.id)
                    .update(payload)
                break
            case EXCHANGE_RATE_WIDGET_ADD_CURRENCY_ITEM:
                session.ExchangeRateCurrency.create({
                    widget: ExchangeRateWidget.withId(payload.id)
                })
                break
        }
    }
}
ExchangeRateWidget.modelName = 'ExchangeRateWidget'

export default ExchangeRateWidget
