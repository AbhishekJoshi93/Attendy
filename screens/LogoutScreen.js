import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'

import { Card, Button } from 'react-native-elements'

import { logoutUser } from '../redux/actions/userActions'

const LogoutScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logoutUser())
    navigation.navigate('Login')
  }

  return (
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
  )
}

export default LogoutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f6e7',
  },
})
