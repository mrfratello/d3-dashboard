import { ORM } from 'redux-orm'
import { Widget } from './Widget'
import { ExchangeRateWidget } from './ExchangeRateWidget'
import { Currency } from './Currency'


export const orm = new ORM()
orm.register(Widget, Currency, ExchangeRateWidget)

export default orm
