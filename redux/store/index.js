import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { currentUserReducer } from '../reducers/userReducers'
import { currentClassReducer } from '../reducers/classReducers'

const reducer = combineReducers({
  currentUser: currentUserReducer,
  currentClass: currentClassReducer,
})

const middleware = [thunk]

const store = createStore(reducer, applyMiddleware(thunk))

export default store
