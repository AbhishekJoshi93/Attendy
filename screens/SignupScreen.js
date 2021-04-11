import React, { useEffect, useState } from 'react'

import { View, Text, Image, StyleSheet, Alert } from 'react-native'

import { Input, Button, Icon } from 'react-native-elements'

import firebase from 'firebase'
import 'firebase/firestore'

import { TouchableOpacity } from 'react-native-gesture-handler'

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [person, setPerson] = useState('')
  const [enable, setEnable] = useState(false)
  const [enable2, setEnable2] = useState(false)

  useEffect(() => {
    setEnable(!enable)
    setPerson('Student')
  }, [])

  const signupHandler = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        if (person == 'Teacher') {
          firebase
            .firestore()
            .collection('teachers')
            .doc(firebase.auth().currentUser.uid)
            .set({
              name,
              email,
            })
        } else if (person == 'Student') {
          firebase
            .firestore()
            .collection('students')
            .doc(firebase.auth().currentUser.uid)
            .set({
              name,
              email,
            })
        }

        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
            person,
          })
        navigation.navigate('Login')
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            Alert.alert('Email already in use !')
            break
          default:
            Alert.alert('Enter again !')
        }
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.imagesContainer}>
          <TouchableOpacity
            onPress={() => {
              setEnable2(!enable2)
              setPerson('Teacher')
            }}
            disabled={enable}
            style={{ borderRadius: 50, borderWidth: 3, overflow: 'hidden' }}
          >
            <Image
              style={styles.imagemam}
              source={require('../assets/images/mam.png')}
            />
            {enable2 && (
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ color: '#252a34', fontSize: 18 }}>Teacher</Text>
                <Icon name='check-circle' type='font-awesome' color='#252a34' />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setEnable(!enable)
              setPerson('Student')
            }}
            disabled={enable2}
            style={{ borderRadius: 50, borderWidth: 3, overflow: 'hidden' }}
          >
            <Image
              style={styles.imagestu}
              source={require('../assets/images/stu.png')}
            />
            {enable && (
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ color: '#252a34', fontSize: 18 }}>Student</Text>
                <Icon name='check-circle' type='font-awesome' color='#252a34' />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.textinputs}>
          <Input
            leftIcon={{
              type: 'font-awesome',
              name: 'user',
              color: '#252a34',
            }}
            placeholder='Enter Name'
            onChangeText={(name) => setName(name)}
            value={name}
            autoFocus={false}
            style={{
              padding: 5,
            }}
          />
        </View>
        <View style={styles.textinputs}>
          <Input
            leftIcon={{
              type: 'font-awesome',
              name: 'envelope',
              color: '#252a34',
            }}
            placeholder='Enter Email'
            onChangeText={(email) => setEmail(email)}
            value={email}
            autoCompleteType='off'
            autoCorrect={false}
            autoFocus={false}
            style={{
              padding: 5,
            }}
          />
        </View>
        <View style={styles.textinputs}>
          <Input
            leftIcon={{
              type: 'font-awesome',
              name: 'lock',
              color: '#252a34',
            }}
            placeholder='Enter Password'
            secureTextEntry={true}
            onChangeText={(pass) => setPassword(pass)}
            value={password}
            autoFocus={false}
            style={{
              padding: 5,
            }}
          />
        </View>
        <View
          style={{
            marginTop: '-7%',
            flex: 0.4,
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              marginTop: '-5%',
              color: '#252a34',
              fontSize: 15,
              textAlign: 'center',
            }}
          >
            Attendy User?
          </Text>
          <Button
            title='Login'
            type='clear'
            onPress={() => navigation.navigate('Login')}
          />
        </View>
        <Button
          title='Signup'
          type='outline'
          raised
          onPress={() => signupHandler()}
        />
      </View>
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagesContainer: {
    height: 200,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 50,
  },
  imagemam: {
    margin: 5,
    width: 150,
    height: 150,
  },
  imagestu: {
    margin: 5,
    width: 150,
    height: 150,
  },
  bodyContainer: {
    height: 450,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
})
