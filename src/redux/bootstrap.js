export default function bootstrap(schema) {
    const store = JSON.parse(localStorage.getItem('store')) || {}
    const state = Object.assign(schema.getEmptyState(), store)
    const session = schema.mutableSession(state)
    const { Widget } = session;

    if (!Widget.all().count()) {
        Widget.create({ title: 'Hello' })
        Widget.create({ title: 'world' })
    }
    return {
        ...state
    }
}
