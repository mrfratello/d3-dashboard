import { createSelector } from 'redux-orm'
import { orm } from './model'


const dbStateSelector = state => state

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