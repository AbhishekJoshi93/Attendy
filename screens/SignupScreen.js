import React, { useState } from 'react'

import { View, Text, Image, StyleSheet, Pressable } from 'react-native'

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

  const signupHandler = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('====================================')
        console.log(result)
        console.log('====================================')
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
        console.error(error)
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
                <Text style={{ color: '#314e52', fontSize: 18 }}>Teacher</Text>
                <Icon name='check-circle' type='font-awesome' color='#cd8f82' />
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
                <Text style={{ color: '#314e52', fontSize: 18 }}>Student</Text>
                <Icon name='check-circle' type='font-awesome' color='#cd8f82' />
              </View>
            )}
          </TouchableOpacity>
        </View>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f6e7',
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
    width: 150,
    height: 150,
  },
  imagestu: {
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
