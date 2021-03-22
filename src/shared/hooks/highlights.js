export function highlightsReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload]
    case 'DELETE':
      const hid = state.findIndex(h => h.highlightId === action.payload)
      
      return [
        ...state.slice(0, hid),
        ...state.slice(hid + 1)
      ]
    case 'INIT':
      return action.payload
    default:
      throw new Error('Invalid action for blocks reducer')
    }
  }
