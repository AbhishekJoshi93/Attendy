import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { View, Text } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { fetchClassCode } from '../redux/actions/classActions'

const ClassHome = ({ navigation }) => {
  const dispatch = useDispatch()

  const currentClass = useSelector((state) => state.currentClass)
  const { loginClass } = currentClass

  if (loginClass == undefined) {
    return <ActivityIndicator size='large' color='#000000' />
  } else {
    return (
      <View>
        <Text>{loginClass.Code}</Text>
      </View>
    )
  }
}

export default ClassHome
