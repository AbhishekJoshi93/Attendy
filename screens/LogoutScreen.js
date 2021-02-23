import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { useDispatch } from 'react-redux'

import { Icon } from 'react-native-elements'

import { logoutUser } from '../redux/actions/userActions'
import Header from './HeaderComponent'

const LogoutScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logoutUser())
    navigation.navigate('Login')
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f7f6e7',
      }}
    >
      <Header greeting='Bye' />
      <View style={styles.flatlistContainer}>
        <Text style={styles.textstyleHeader}>Logout</Text>
        <View
          style={{
            backgroundColor: '#314e52',
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
              color=''
              onPress={() => logoutHandler()}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default LogoutScreen

const styles = StyleSheet.create({
  flatlistContainer: {
    flex: 1,
    backgroundColor: '#e7e6e1',
    margin: 10,
    alignItems: 'baseline',
    borderRadius: 25,
  },
  textstyleHeader: {
    paddingHorizontal: 20,
    color: '#f2a154',
    fontSize: 50,
  },
  textstyleDes: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#e7e6e1',
    fontSize: 20,
  },
})
