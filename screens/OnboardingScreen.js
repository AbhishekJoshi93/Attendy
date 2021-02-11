import React from 'react'

import { View, StyleSheet, Image } from 'react-native'

import Onboarding from 'react-native-onboarding-swiper'

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: '#f7f6e7',
          image: (
            <View style={styles.imgcon}>
              <Image
                source={require('../assets/images/teacher.png')}
                style={{ width: 350, height: 400 }}
              />
            </View>
          ),
          title: 'Attendy',
          subtitle: 'Evaluation based attendance app with alerts',
        },
        {
          backgroundColor: '#f7f6e7',
          image: (
            <View style={styles.imgcon}>
              <Image
                source={require('../assets/images/boy.png')}
                style={{ width: 350, height: 400 }}
              />
            </View>
          ),
          title: 'Waiting',
          subtitle: 'No extra time required to manual take attendance',
        },
        {
          backgroundColor: '#f7f6e7',
          image: (
            <View style={styles.imgcon}>
              <Image
                source={require('../assets/images/bag.png')}
                style={{ width: 350, height: 400 }}
              />
            </View>
          ),
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
