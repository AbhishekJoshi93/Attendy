import React, { useState, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import AsyncStorage from '@react-native-community/async-storage'

import { SafeAreaProvider } from 'react-native-safe-area-context'

import OnboardingScreen from './screens/OnboardingScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'

const AppStack = createStackNavigator()

const App = () => {
  const [isFirst, setIsFirst] = useState(null)

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setIsFirst(true)
      } else {
        setIsFirst(false)
      }
    })
  }, [])

  //   if (isFirst == null) {
  //   return null
  // } else if (isFirst == true) {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppStack.Navigator headerMode='none'>
          <AppStack.Screen name='Onboarding' component={OnboardingScreen} />
          <AppStack.Screen name='Login' component={LoginScreen} />
          <AppStack.Screen name='Signup' component={SignupScreen} />
        </AppStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
  // } else {
  //   return <LoginScreen />
  // }
}

export default App
