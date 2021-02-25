import firebase from 'firebase'
import 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

const ClassSetting = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const currentClass = useSelector((state) => state.currentClass)
  const { loginClass } = currentClass

  const [ClassObj, setClassObj] = useState([])

  if (loginClass == undefined) {
    return <ActivityIndicator size='large' color='#000000' />
  } else {
    firebase
      .firestore()
      .collection('classes')
      .doc(loginClass)
      .get()
      .then((querySnapShot) => {
        setClassObj(querySnapShot.data())
      })

    return (
      <View>
        <Text>{ClassObj.Code}</Text>
      </View>
    )
  }
}

export default ClassSetting
