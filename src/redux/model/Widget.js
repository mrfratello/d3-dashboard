import { Model, attr } from 'redux-orm'
import { WIDGET_UPDATE, WIDGET_LAYOUT_UPDATE } from '../action/types'


export class Widget extends Model {
    static get fields() {
        return {
            id: attr(),
            title: attr(),
            w: attr(),
            h: attr()
        }
    }
    static reducer({type, payload}, Widget) {
        switch (type) {
            case WIDGET_UPDATE:
                const { id } = payload
                Widget.withId(id).update(payload)
                break
            case WIDGET_LAYOUT_UPDATE:
                payload.map(
                    layout => Widget.withId(layout.i).update(layout)
                )
                break
        }
    }
}
Widget.modelName = 'Widget'

export default Widget
