import firebase from 'firebase'
import { USER_STATE_CHANGE, USER_STATE_RESET } from '../constants/userConstants'

export const fetchUser = () => (dispatch) => {
  try {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, payload: snapshot.data() })
        } else {
        }
      })
  } catch (error) {}
}

export const logoutUser = () => (dispatch) => {
  try {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: USER_STATE_RESET })
      })
  } catch (error) {}
}
