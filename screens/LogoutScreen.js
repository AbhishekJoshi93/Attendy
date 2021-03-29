import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { useDispatch } from 'react-redux'

import { Icon } from 'react-native-elements'

import firebase from 'firebase'
import 'firebase/firestore'

import { logoutUser } from '../redux/actions/userActions'
import Header from './HeaderComponent'

const LogoutScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    firebase.auth().signOut()
    navigation.navigate('Login')
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
      }}
    >
      <Header greeting='Bye' />
      <View style={{ flex: 2, justifyContent: 'flex-start' }}>
        <View style={styles.flatlistContainer}>
          <Text style={styles.textstyleHeader}>Logout</Text>
          <View
            style={{
              backgroundColor: '#252a34',
              width: '100%',
              borderRadius: 25,
            }}
          >
            <Text style={styles.textstyleDes}>Are you sure?</Text>
            <View
              style={{
                alignSelf: 'flex-end',
                marginBottom: -20,
              }}
            >
              <Icon
                raised
                name='telegram'
                type='font-awesome'
                onPress={() => logoutHandler()}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default LogoutScreen

const styles = StyleSheet.create({
  flatlistContainer: {
    backgroundColor: '#ff2e63',
    margin: 10,
    alignItems: 'baseline',
    borderRadius: 25,
  },
  textstyleHeader: {
    paddingHorizontal: 20,
    color: '#ffffff',
    fontSize: 50,
  },
  textstyleDes: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 20,
  },
})
