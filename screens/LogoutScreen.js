import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'

import { Card, Button } from 'react-native-elements'

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
      <View style={styles.container}>
        <Card containerStyle={{ backgroundColor: '#e7e6e1' }}>
          <Card.Title style={{ color: '#314e52' }}>
            Are you sure to logout ?
          </Card.Title>
          <Card.Divider />
          <View>
            <Button
              title='Logout'
              type='outline'
              raised
              onPress={() => logoutHandler()}
            />
          </View>
        </Card>
      </View>
    </View>
  )
}

export default LogoutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})
