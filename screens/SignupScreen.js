import React, { useState } from 'react'

import { View, Text, Image, StyleSheet } from 'react-native'

import { Input, Button } from 'react-native-elements'

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
              name: 'user',
              color: '#cd8f82',
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
              color: '#cd8f82',
            }}
            placeholder='Enter Email'
            onChangeText={(email) => setUsername(email)}
            value={username}
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
            Attendy User?
          </Text>
          <Button
            title='Login'
            type='clear'
            onPress={() => navigation.navigate('Login')}
          />
        </View>
        <Button title='Signup' type='outline' raised />
      </View>
    </View>
  )
}

export default SignupScreen

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
    height: 375,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
})
