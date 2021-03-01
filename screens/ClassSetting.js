import firebase from 'firebase'
import 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Avatar, Icon, Input } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'

import { useDispatch, useSelector } from 'react-redux'

const ClassSetting = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const currentClass = useSelector((state) => state.currentClass)
  const { loginClass } = currentClass

  const [ClassObj, setClassObj] = useState({})
  const [Title, setTitle] = useState(loginClass.Title)
  const [Des, setDes] = useState(loginClass.Des)

  if (loginClass == undefined) {
    return <ActivityIndicator size='large' color='#000000' />
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.head}>
        <Text style={{ fontSize: 35, color: '#314e52' }}>Setting</Text>
      </View>
      <View>
        <View style={styles.heading}>
          <Text style={{ fontSize: 25, color: '#314e52' }}>
            Class Information
          </Text>
        </View>
        <View style={styles.innerPart}>
          <Input
            leftIcon={{
              type: 'font-awesome',
              name: 'odnoklassniki',
              color: '#cd8f82',
            }}
            disabled
            placeholder='Enter class title'
            onChangeText={(title) => setTitle(title)}
            value={Title}
            autoFocus={false}
            style={{ padding: 5 }}
          />
          <Input
            leftIcon={{
              type: 'font-awesome',
              name: 'angellist',
              color: '#cd8f82',
            }}
            disabled
            placeholder='Enter class description'
            onChangeText={(des) => setDes(des)}
            value={Des}
            autoFocus={false}
            style={{ padding: 5 }}
          />
        </View>
        <View style={styles.heading}>
          <Text style={{ fontSize: 25, color: '#314e52' }}>Teacher</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            margin: 25,
          }}
        >
          <Text style={{ fontSize: 20 }}>
            {loginClass.Teacher.Name} - {loginClass.Teacher.Email}
          </Text>
          <Avatar
            rounded
            size='small'
            title={
              loginClass.Teacher.Name.charAt(0) +
              loginClass.Teacher.Email.charAt(0)
            }
            overlayContainerStyle={{ backgroundColor: '#cd8f82' }}
          />
        </View>
        <View style={styles.heading}>
          <Text style={{ fontSize: 25, color: '#314e52' }}>Students</Text>
        </View>

        {loginClass.Student != undefined &&
          loginClass.Student.map((stu) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  margin: 25,
                }}
              >
                <Text style={{ fontSize: 20 }}>
                  {stu.Name} - {stu.Email}
                </Text>
                <Avatar
                  rounded
                  size='small'
                  title={stu.Name.charAt(0) + stu.Email.charAt(0)}
                  overlayContainerStyle={{ backgroundColor: '#cd8f82' }}
                />
              </View>
            )
          })}
      </View>
    </ScrollView>
  )
}

export default ClassSetting

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e6e1',
  },
  heading: {
    marginHorizontal: 25,
    marginTop: 20,
  },
  head: {
    margin: 25,
  },
  innerPart: {
    marginHorizontal: 15,
    marginTop: 10,
  },
})
