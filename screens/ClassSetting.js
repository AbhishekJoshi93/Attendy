import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

const ClassSetting = ({ navigation }) => {
  useEffect(() => {
    navigation.navigate('Root')
  }, [])

  return (
    <View>
      <Text>ClassSetting</Text>
    </View>
  )
}

export default ClassSetting
