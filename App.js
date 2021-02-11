import React, { useState, useEffect } from 'react'

import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCp1Hte28pE408Z5PMmJkDWzyoe0rxw1uU',
  authDomain: 'attendy-b9dff.firebaseapp.com',
  projectId: 'attendy-b9dff',
  storageBucket: 'attendy-b9dff.appspot.com',
  messagingSenderId: '773242635684',
  appId: '1:773242635684:web:868dcf6081cd857a86ad31',
  measurementId: 'G-DZWG19X0LP',
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import AsyncStorage from '@react-native-community/async-storage'

import { SafeAreaProvider } from 'react-native-safe-area-context'

import OnboardingScreen from './screens/OnboardingScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import HomeScreen from './screens/HomeScreen'

const AppStack = createStackNavigator()

const App = () => {
  const [isFirst, setIsFirst] = useState(null)
  const [isLogin, setLogin] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setIsFirst(true)
      } else {
        setIsFirst(false)
        firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            setLogin(true)
          } else {
            setLogin(false)
          }
        })
      }
    })
  }, [])

  if (isFirst == null) {
    return null
  } else if (isFirst == true) {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <AppStack.Navigator headerMode='none' initialRouteName='Onboarding'>
            <AppStack.Screen name='Onboarding' component={OnboardingScreen} />
            <AppStack.Screen name='Signup' component={SignupScreen} />
            <AppStack.Screen name='Login' component={LoginScreen} />
            <AppStack.Screen name='Home' component={HomeScreen} />
          </AppStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    )
  } else {
    if (!isLogin) {
      return (
        <SafeAreaProvider>
          <NavigationContainer>
            <AppStack.Navigator headerMode='none' initialRouteName='Home'>
              <AppStack.Screen name='Signup' component={SignupScreen} />
              <AppStack.Screen name='Home' component={HomeScreen} />
              <AppStack.Screen name='Login' component={LoginScreen} />
            </AppStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      )
    } else {
      return (
        <SafeAreaProvider>
          <NavigationContainer>
            <AppStack.Navigator headerMode='none' initialRouteName='Login'>
              <AppStack.Screen name='Signup' component={SignupScreen} />
              <AppStack.Screen name='Home' component={HomeScreen} />
              <AppStack.Screen name='Login' component={LoginScreen} />
            </AppStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      )
    }
  }
}

export default App
