import { createSelector } from 'redux-orm'
import { orm } from './model'


const dbStateSelector = state => state

export const widgetSelector = createSelector(
    orm,
    dbStateSelector,
    session => session.Widget.all().toModelArray().map(widget => {
            const obj = widget.ref
            return Object.assign({}, obj)
        })
)
