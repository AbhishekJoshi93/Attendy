import React, { useEffect } from 'react'
import { View } from 'react-native'

import firebase from 'firebase'

const LogoutScreen = ({ navigation }) => {
  useEffect(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login')
      })
  }, [])
  return <View></View>
}

export default LogoutScreen
