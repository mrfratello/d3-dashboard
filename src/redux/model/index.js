import { ORM } from 'redux-orm'
import { Widget } from './Widget'
import { Currency } from './Currency'
import { ExchangeRateWidget } from './ExchangeRateWidget'
import { ExchangeRateCurrency } from './ExchangeRateCurrency'


export const orm = new ORM()
orm.register(Widget, Currency, ExchangeRateWidget, ExchangeRateCurrency)

export default orm
