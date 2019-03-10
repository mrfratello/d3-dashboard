import { Model, attr, oneToOne, fk } from 'redux-orm'


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
        const currencies = this.currencies.toModelArray().map(currency => currency.ref)
        return Object.assign({}, this.ref, {currencies})
    }
    // static reducer({type, payload}, Widget) {
    //     switch (type) {
    //         case WIDGET_UPDATE:
    //             const { id } = payload
    //             Widget.withId(id).update(payload)
    //             break
    //     }
    // }
}
ExchangeRateWidget.modelName = 'ExchangeRateWidget'

export default ExchangeRateWidget
