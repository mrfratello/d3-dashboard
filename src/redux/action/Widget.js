import {
    WIDGET_UPDATE,
    WIDGET_LAYOUT_UPDATE
} from './types'

export const widgetUpdate = payload => ({
        type: WIDGET_UPDATE,
        payload
    })

export const widgetLayoutUpdate = payload => ({
        type: WIDGET_LAYOUT_UPDATE,
        payload
    })
