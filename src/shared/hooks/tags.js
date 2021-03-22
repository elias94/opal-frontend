export function tagsReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload]
    case 'REMOVE':
      const index = state.indexOf(action.payload)
      return [...state.slice(0, index), ...state.slice(index + 1)]
    case 'REMOVE_LAST':
      return state.slice(0, -1)
    case 'RESET':
      return []
    default:
      throw new Error('Invalid action for cursor reducer')
  }
}
