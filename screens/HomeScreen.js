import React, { useEffect } from 'react'
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native'
import { Avatar, Badge } from 'react-native-elements'

import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/actions/userActions'

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.currentUser)
  const { loginUser } = currentUser

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  if (loginUser == undefined) {
    return <ActivityIndicator size='large' color='#000000' />
  }

  return (
    <View style={styles.container}>
      <Text>Hello, {loginUser.name}!</Text>
      <View>
        <Avatar
          rounded
          size='medium'
          title={loginUser.name.charAt(0)}
          overlayContainerStyle={{ backgroundColor: '#cd8f82' }}
        />
        {loginUser.person == 'Student' ? (
          <Badge status='success' containerStyle={{ position: 'absolute' }} />
        ) : (
          <Badge status='error' containerStyle={{ position: 'absolute' }} />
        )}
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f6e7',
  },
})
