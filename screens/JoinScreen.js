import React, { useState, useEffect } from 'react'
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'

import Header2 from './Header2Component'

import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/actions/userActions'

const JoinScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.currentUser)
  const { loginUser } = currentUser

  const [Title, setTitle] = useState('')
  const [Code, setCode] = useState('')

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  if (loginUser == undefined) {
    return <ActivityIndicator size='large' color='#000000' />
  }

  const joinHandler = () => {}

  return (
    <View style={{ backgroundColor: '#f7f6e7', flex: 1 }}>
      <Header2 greeting='Join Class' />
      {loginUser.person == 'Student' ? (
        <View style={styles.container}>
          <Input
            leftIcon={{
              type: 'font-awesome',
              name: 'odnoklassniki',
              color: '#cd8f82',
            }}
            placeholder='Enter class title'
            onChangeText={(title) => setTitle(title)}
            value={Title}
            autoFocus={false}
            style={{ padding: 5 }}
          />
          <Input
            leftIcon={{
              type: 'font-awesome',
              name: 'key',
              color: '#cd8f82',
            }}
            placeholder='Enter code'
            onChangeText={(code) => setCode(code)}
            value={Code}
            autoFocus={false}
            style={{ padding: 5 }}
          />
          <Button
            title='Join'
            type='outline'
            raised
            onPress={() => joinhandler()}
          />
        </View>
      ) : (
        <View style={styles.container2}>
          <Icon raised name='lock' type='font-awesome' color='#cd8f82' />
        </View>
      )}
    </View>
  )
}

export default JoinScreen

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    padding: 30,
  },
  container2: {
    flex: 2,
    alignItems: 'center',
  },
})
