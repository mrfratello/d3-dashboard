import { WIDGET_UPDATE } from './types' 

export const widgetUpdateTitle = props => ({
        type: WIDGET_UPDATE,
        payload: props
    })
