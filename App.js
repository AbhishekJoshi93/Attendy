import React, { useState, useEffect } from 'react'

import * as firebase from 'firebase'

import { Provider } from 'react-redux'
import store from './redux/store'

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
import { createDrawerNavigator } from '@react-navigation/drawer'

import AsyncStorage from '@react-native-community/async-storage'

import { SafeAreaProvider } from 'react-native-safe-area-context'

import OnboardingScreen from './screens/OnboardingScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import LogoutScreen from './screens/LogoutScreen'
import ReportScreen from './screens/ReportScreen'
import CreateScreen from './screens/CreateScreen'
import JoinScreen from './screens/JoinScreen'

const AppStack = createStackNavigator()
const Drawer = createDrawerNavigator()

const App = () => {
  const [isLogin, setLogin] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLogin(false)
      } else {
        setLogin(true)
      }
    })
  }, [])

  if (!isLogin) {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppStack.Navigator headerMode='none'>
              <AppStack.Screen name='Onboarding' component={OnboardingScreen} />
              <AppStack.Screen name='Signup' component={SignupScreen} />
              <AppStack.Screen name='Login' component={LoginScreen} />
              <AppStack.Screen name='Root' component={Root} />
            </AppStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    )
  }

  function Root() {
    return (
      <Drawer.Navigator
        drawerStyle={{ backgroundColor: '#cd8f82' }}
        drawerContentOptions={{
          activeBackgroundColor: '#f7f6e7',
          activeTintColor: '#314e52',
          inactiveTintColor: '#e7e6e1',
        }}
        initialRouteName='Home'
      >
        <Drawer.Screen name='Home' component={HomeScreen} />
        <Drawer.Screen name='Create Class' component={CreateScreen} />
        <Drawer.Screen name='Join Class' component={JoinScreen} />
        <Drawer.Screen name='Attendance Report' component={ReportScreen} />
        <Drawer.Screen name='Profile' component={ProfileScreen} />
        <Drawer.Screen name='Logout' component={LogoutScreen} />
      </Drawer.Navigator>
    )
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppStack.Navigator headerMode='none'>
            <AppStack.Screen name='Root' component={Root} />
            <AppStack.Screen name='Signup' component={SignupScreen} />
            <AppStack.Screen name='Login' component={LoginScreen} />
          </AppStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
