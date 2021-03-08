import React, { useEffect } from 'react'
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native'
import { Avatar, Badge } from 'react-native-elements'

import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/actions/userActions'

const Header = ({ navigation, greeting }) => {
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
      <Text
        style={{
          fontSize: 30,
          color: '#314e52',
        }}
      >
        {greeting}, {loginUser.name}!
      </Text>
      <View style={styles.innercontainer}>
        <Avatar
          rounded
          size='medium'
          titleStyle={{ color: '#252a34' }}
          containerStyle={{ borderColor: '#252a34', borderWidth: 2 }}
          title={loginUser.name.charAt(0) + loginUser.email.charAt(0)}
          overlayContainerStyle={{ backgroundColor: '#eaeaea' }}
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

export default Header

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  innercontainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
})
