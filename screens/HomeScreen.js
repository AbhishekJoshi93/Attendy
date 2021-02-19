import React from 'react'
import { View } from 'react-native'

import Header from './HeaderComponent'

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: '#f7f6e7' }}>
      <Header greeting='Hello' />
    </View>
  )
}

export default HomeScreen
