import React, { useState, useEffect } from 'react'
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'

import Header2 from './Header2Component'

import firebase from 'firebase'
import 'firebase/firestore'

import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/actions/userActions'
import { Alert } from 'react-native'

const JoinScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.currentUser)
  const { loginUser } = currentUser

  const [Title, setTitle] = useState('')
  const [Des, setDes] = useState('')
  const [Code, setCode] = useState('')
  const [Id, setId] = useState('')

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  if (loginUser == undefined) {
    return <ActivityIndicator size='large' color='#000000' />
  }

  const joinHandler = () => {
    firebase
      .firestore()
      .collection('classes')
      .where('Code', '==', Code)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setId(doc.id)
          setTitle(doc.data().Title)
          setDes(doc.data().Des)
        })
      })
      .catch((error) => {
        Alert.alert('Class cannot found')
        return
      })
    if (Id == '') {
      return <ActivityIndicator size='large' color='#000000' />
    }
    if (Id != '') {
      firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('class')
        .doc(Id)
        .set({
          Title,
          Des,
          Code,
        })
        .catch((error) => {
          Alert.alert('Class cannot join')
          return
        })
      firebase
        .firestore()
        .collection('classes')
        .doc(Id)
        .update({
          Student: firebase.firestore.FieldValue.arrayUnion({
            Name: `${loginUser.name}`,
            Email: `${loginUser.email}`,
          }),
        })
        .then((result) => {
          firebase
            .firestore()
            .collection('students')
            .doc(firebase.auth().currentUser.uid)
            .collection('Classes')
            .doc(Id)
            .set({
              ClassTitle: Title,
              ClassDes: Des,
              ClassCode: Code,
            })
            .then((res) => {
              Alert.alert(`Class ${Title} joined`)
              setTitle('')
              setDes('')
              setCode('')
              setId('')
              navigation.navigate('Home')
            })
        })
        .catch((error) => {
          Alert.alert('Class cannot join')
          return
        })
    }
  }

  return (
    <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
      <Header2 greeting='Join Class' />
      {loginUser.person == 'Student' ? (
        <View style={styles.container}>
          <Input
            leftIcon={{
              type: 'font-awesome',
              name: 'key',
              color: '#252a34',
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
            onPress={() => joinHandler()}
          />
        </View>
      ) : (
        <View style={styles.container2}>
          <Icon raised name='lock' type='font-awesome' color='#252a34' />
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
