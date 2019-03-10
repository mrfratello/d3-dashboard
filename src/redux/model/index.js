import { ORM } from 'redux-orm'
import { Widget } from './Widget'
import { ExchangeRateWidget, ExchangeRateCarrency } from './ExchangeRateWidget'


export const orm = new ORM()
orm.register(Widget, ExchangeRateWidget, ExchangeRateCarrency)

export default orm
