import { Model, attr, oneToOne, many } from 'redux-orm'
import { EXCHANGE_RATE_WIDGET_UPDATE } from '../action/types'


export class ExchangeRateWidget extends Model {
    static get fields() {
        return {
            id: attr(),
            widget: oneToOne('Widget', 'type'),
            dateFrom: attr(),
            dateTo: attr(),
            currencies: many('Currency', 'exchangeRateWidgets')
        }
    }

    toJson() {
        return {
            ...this.ref,
            currencies: this.currencies.toRefArray()
        }
    }
    static reducer({type, payload}, ExchangeRateWidget) {
        switch (type) {
            case EXCHANGE_RATE_WIDGET_UPDATE:
                const { id } = payload
                ExchangeRateWidget.withId(id).update(payload)
                break
        }
    }
}
ExchangeRateWidget.modelName = 'ExchangeRateWidget'

export default ExchangeRateWidget
