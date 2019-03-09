import { ORM } from 'redux-orm'
import { Widget } from './Widget'


export const orm = new ORM()
orm.register(Widget)

export default orm
