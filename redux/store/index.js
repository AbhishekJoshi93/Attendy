import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { currentUserReducer } from '../reducers/userReducers'

const reducer = combineReducers({
  currentUser: currentUserReducer,
})

const middleware = [thunk]

const store = createStore(reducer, applyMiddleware(thunk))

export default store
