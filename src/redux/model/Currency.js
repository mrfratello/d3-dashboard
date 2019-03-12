import { Model, attr } from 'redux-orm'
import { CURRENCY_FILL } from '../action/types'


export class Currency extends Model {
    static get fields() {
        return {
            id: attr(),
            rate: attr(),
            code: attr(),
            name: attr()
        }
    }

    static reducer({type, payload}, Currency) {
        switch (type) {
            case CURRENCY_FILL:
                Currency.delete()
                payload.map(item => Currency.create(item))
                break
        }
    }
}
Currency.modelName = 'Currency'

export default Currency