import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/actions/userActions'

const JoinScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.currentUser)
  const { loginUser } = currentUser

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  if (loginUser == undefined) {
    return <Text>Loading</Text>
  }

  return <Text style={{ margin: 50 }}>JoinScreen</Text>
}

export default JoinScreen
