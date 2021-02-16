import { USER_STATE_CHANGE, USER_STATE_RESET } from '../constants/userConstants'

export const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return { loginUser: action.payload }
    case USER_STATE_RESET:
      return {}
    default:
      return state
  }
}
