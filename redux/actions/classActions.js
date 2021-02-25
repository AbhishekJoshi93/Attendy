import firebase, { firestore } from 'firebase'
import {
  CLASS_STATE_CHANGE,
  CLASS_STATE_RESET,
} from '../constants/classConstants'

export const fetchClass = (ItemCode) => (dispatch) => {
  firebase
    .firestore()
    .collection('classes')
    .where('Code', '==', ItemCode)
    .get()
    .then((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        dispatch({ type: CLASS_STATE_CHANGE, payload: doc.data() })
      })
    })
}

export const fetchClassCode = () => (dispatch, getState) => {
  const {
    currentClass: { loginClass },
  } = getState()

  dispatch({ type: CLASS_STATE_SAME })
}

export const deleteClass = () => (dispatch) => {
  dispatch({ type: CLASS_STATE_RESET })
}
