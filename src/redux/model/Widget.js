import { Model, attr } from 'redux-orm'
import { WIDGET_UPDATE } from '../action/types'


export class Widget extends Model {
    static get fields() {
        return {
            id: attr(),
            title: attr(),
            width: attr(),
            height: attr()
        }
    }
    static reducer({type, payload}, Widget) {
        switch (type) {
            case WIDGET_UPDATE:
                const { id } = payload
                Widget.withId(id).update(payload)
                break
        }
    }
}
Widget.modelName = 'Widget'

export default Widget
