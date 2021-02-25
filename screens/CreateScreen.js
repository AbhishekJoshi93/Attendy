import React, { useState, useEffect } from 'react'
import { ActivityIndicator, View, StyleSheet, Text, Alert } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'

import Header2 from './Header2Component'

import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/actions/userActions'

import firebase from 'firebase'
import 'firebase/firestore'

const CreateScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.currentUser)
  const { loginUser } = currentUser

  const [Title, setTitle] = useState('')
  const [Des, setDes] = useState('')
  const [Code, setCode] = useState(`${(+new Date()).toString(36).slice(-5)}`)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  if (loginUser == undefined) {
    return <ActivityIndicator size='large' color='#000000' />
  }

  const createHandler = () => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('class')
      .add({
        Title,
        Des,
        Code,
      })
      .then((result) => {
        firebase
          .firestore()
          .collection('classes')
          .doc(result.id)
          .set({
            Title,
            Des,
            Code,
            Teacher: {
              Name: `${loginUser.name}`,
              Email: `${loginUser.email}`,
            },
          })
          .then((res) => {
            Alert.alert(`Class ${Title} created`)
            setTitle('')
            setDes('')
            setCode(`${(+new Date()).toString(36).slice(-5)}`)
            navigation.navigate('Home')
          })
          .catch((err) => {
            Alert.alert('Try again')
          })
      })
      .catch((error) => {
        Alert.alert('Class is not created')
      })
  }

  return (
    <View style={{ backgroundColor: '#f7f6e7', flex: 1 }}>
      <Header2 greeting='Create Class' />
      {loginUser.person == 'Teacher' ? (
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
              name: 'angellist',
              color: '#cd8f82',
            }}
            placeholder='Enter class description'
            onChangeText={(des) => setDes(des)}
            value={Des}
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
            title='Create'
            type='outline'
            raised
            onPress={() => createHandler()}
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

export default CreateScreen

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
