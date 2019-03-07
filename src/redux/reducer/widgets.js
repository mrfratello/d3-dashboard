const widgetReducer = (state={}, action) => {
    switch (action.type) {
        case 'ADD_WIDGET':
            return {
                id: action.id,
                title: action.title
            }
        default:
            return state
    }
}

export const widgetsReducer = (state=[], action) => {
    switch (action.type) {
        case 'ADD_WIDGET':
            return [
                ...state,
                widgetReducer({}, action)
            ]
        default:
            return state
    }
}
