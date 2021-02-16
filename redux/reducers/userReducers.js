import { USER_STATE_CHANGE } from '../constants/userConstants'

export const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return { loginUser: action.payload }
    default:
      return state
  }
}
