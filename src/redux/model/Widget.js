import { Model, attr } from 'redux-orm'


export class Widget extends Model {}
Widget.modelName = 'Widget'
Widget.fields = {
    id: attr(),
    title: attr()
}

export default Widget
