import React from 'react'
import { View } from 'react-native'

import Header2 from './Header2Component'

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: '#f7f6e7' }}>
      <Header2 greeting='Profile' />
    </View>
  )
}

export default ProfileScreen
