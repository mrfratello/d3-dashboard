export default function bootstrap(schema) {
    const state = schema.getEmptyState();
    const session = schema.mutableSession(state);
    const { Widget } = session;

    Widget.create({ title: 'Hello' })
    Widget.create({ title: 'world' })

    return {
        orm: state
    }
}
