import React, { useEffect, useState } from 'react'

import { View, Text, Image, StyleSheet, Alert, LogBox } from 'react-native'

import { Input, Button } from 'react-native-elements'

import firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    LogBox.ignoreAllLogs()
  }, [])

  const loginHandler = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        setEmail('')
        setPassword('')
        navigation.navigate('Root')
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
            Alert.alert('User not found !')
            break
          case 'auth/invalid-email':
            Alert.alert('Enter proper email !')
            break
          default:
            Alert.alert('Invalid credential !')
        }
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imagegard}
          source={require('../assets/images/grad.png')}
        />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.textinputs}>
          <Input
            leftIcon={{
              type: 'font-awesome',
              name: 'envelope',
              color: '#cd8f82',
            }}
            placeholder='Enter Email'
            onChangeText={(email) => setEmail(email)}
            value={email}
            autoCompleteType='off'
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
              color: '#cd8f82',
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
              color: '#314e52',
              fontSize: 15,
              textAlign: 'center',
            }}
          >
            New to Attendy?
          </Text>
          <Button
            title='Signup'
            type='clear'
            onPress={() => navigation.navigate('Signup')}
          />
        </View>
        <Button
          title='Login'
          type='outline'
          raised
          onPress={() => loginHandler()}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'baseline',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              color: 'blue',
              fontSize: 15,
              textAlign: 'center',
            }}
            onPress={() => {
              firebase
                .auth()
                .sendPasswordResetEmail(email)
                .then((result) => {
                  Alert.alert('Password reset link sent to email !')
                })
                .catch((error) => {
                  switch (error.code) {
                    default:
                      Alert.alert('Enter email !')
                  }
                })
            }}
          >
            <Text>Forget Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f6e7',
  },
  imageContainer: {
    paddingLeft: '5%',
  },
  imagegard: {
    width: 350,
    height: 200,
  },
  bodyContainer: {
    height: 300,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
})
