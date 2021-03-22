export function cursorReducer(state, action) {
  switch (action.type) {
    case 'PREV':
      return state > 0 ? state - 1 : state
    case 'NEXT':
      return state < action.count ? state + 1 : state
    case 'SET':
      return action.payload
    case 'RESET':
      return null
    default:
      throw new Error('Invalid action for cursor reducer')
  }
}
