import { Model, attr } from 'redux-orm'
import { WIDGET_UPDATE_TITLE } from '../action/types'


export class Widget extends Model {
    toString() {
        return `Widget(${this.id}): ${this.title}`;
    }
    static get fields() {
        return {
            id: attr(),
            title: attr()
        }
    }
    static reducer({type, payload}, Widget, session) {
        switch (type) {
            case WIDGET_UPDATE_TITLE:
                const { id } = payload
                Widget.withId(id).update(payload)
                break
        }
    }
}
Widget.modelName = 'Widget'

export default Widget
