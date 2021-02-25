import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { deleteClass } from '../redux/actions/classActions'

const ClassExit = ({ navigation }) => {
  const dispatch = useDispatch()

  const currentClass = useSelector((state) => state.currentClass)
  const { loginClass } = currentClass

  useEffect(() => {
    deleteClass()
    navigation.navigate('Root')
  }, [])

  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default ClassExit
