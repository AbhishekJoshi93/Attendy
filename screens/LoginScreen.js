import React, { useState } from 'react'

import { View, Text, Image, StyleSheet } from 'react-native'

import { Input, Button } from 'react-native-elements'

import firebase from 'firebase'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        navigation.navigate('Root')
      })
      .catch((error) => {
        console.error(error)
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
              marginTop: '-5%',
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
