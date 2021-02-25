import React from 'react'
import { View, Text } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

const ClassQuiz = ({ navigation }) => {
  const dispatch = useDispatch()

  const currentClass = useSelector((state) => state.currentClass)
  const { loginClass } = currentClass

  if (loginClass == undefined) {
    return <ActivityIndicator size='large' color='#000000' />
  }

  return (
    <View>
      <Text>{loginClass.Code}</Text>
    </View>
  )
}

export default ClassQuiz
