import { createSelector } from 'redux-orm'
import { orm } from './model'


export const dbStateSelector = state => state.orm

export const widgetSelector = createSelector(
    orm,
    dbStateSelector,
    session => session.Widget.all()
            .toModelArray()
            .map(widget => {
                let type = widget.type ? widget.type.toJson() : {}
                return Object.assign({}, widget.ref, {type})
            })
)

export const currencySelector = createSelector(
    orm,
    dbStateSelector,
    ({Currency}) => Currency.all().toRefArray()
)

export const exchangeRateChartData = state => state.exchangeRateChart

export const exchangeRateChartPeriod = createSelector(
    orm,
    dbStateSelector,
    session => session.ExchangeRateWidget.all()
            .toModelArray()
            .map(widget => widget.widget ? widget.ref : false)
            .filter(i => i)
)