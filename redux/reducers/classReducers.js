import {
  CLASS_STATE_CHANGE,
  CLASS_STATE_RESET,
  CLASS_STATE_SAME,
} from '../constants/classConstants'

export const currentClassReducer = (state = { loginClass: [] }, action) => {
  switch (action.type) {
    case CLASS_STATE_CHANGE:
      return { loginClass: action.payload }
    case CLASS_STATE_SAME:
      return { ...state }
    case CLASS_STATE_RESET:
      return { loginClass: [] }
    default:
      return state
  }
}
