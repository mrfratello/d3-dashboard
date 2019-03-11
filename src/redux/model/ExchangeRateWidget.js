import { Model, attr, oneToOne, fk } from 'redux-orm'
import { EXCHANGE_RATE_WIDGET_UPDATE } from '../action/types'


export class ExchangeRateCarrency extends Model {
    static get fields() {
        return {
            id: attr(),
            currency: attr(),
            code: attr(),
            name: attr(),
            exchangeRate: fk('ExchangeRateWidget', 'currencies')
        }
    }
}
ExchangeRateCarrency.modelName = 'ExchangeRateCarrency'


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
        const currencies = this.currencies
                .toModelArray()
                .map(currency => currency.ref)
        return {
            ...this.ref,
            type: 'ExchangeRate',
            currencies
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
