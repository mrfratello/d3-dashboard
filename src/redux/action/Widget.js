import { WIDGET_UPDATE } from './types' 

export const widgetUpdate = props => ({
        type: WIDGET_UPDATE,
        payload: props
    })
