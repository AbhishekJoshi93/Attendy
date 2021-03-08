import React, { useEffect } from 'react'
import { LogBox } from 'react-native'

import { View, StyleSheet, Image } from 'react-native'

import Onboarding from 'react-native-onboarding-swiper'
import { color } from 'react-native-reanimated'

const OnboardingScreen = ({ navigation }) => {
  useEffect(() => {
    LogBox.ignoreAllLogs()
  }, [])

  return (
    <Onboarding
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      bottomBarColor={'#252a34'}
      pages={[
        {
          image: (
            <View>
              <Image
                source={require('../assets/images/teacher.png')}
                style={{ width: 350, height: 400 }}
              />
            </View>
          ),
          titleStyles: { color: '#252a34', fontSize: 50 },
          subTitleStyles: { color: '#252a34', fontSize: 20 },
          title: 'Attendy',
          subtitle: 'Evaluation based attendance app',
        },
        {
          image: (
            <View>
              <Image
                source={require('../assets/images/boy.png')}
                style={{ width: 350, height: 400 }}
              />
            </View>
          ),
          titleStyles: { color: '#252a34', fontSize: 50 },
          subTitleStyles: { color: '#252a34', fontSize: 20 },
          title: 'Waiting',
          subtitle: 'No extra time for manual attendance',
        },
        {
          image: (
            <View>
              <Image
                source={require('../assets/images/bag.png')}
                style={{ width: 350, height: 400 }}
              />
            </View>
          ),
          titleStyles: { color: '#252a34', fontSize: 50 },
          subTitleStyles: { color: '#252a34', fontSize: 20 },
          title: 'Report',
          subtitle: 'Get all attendance track within the app',
        },
      ]}
    />
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
