import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import Header2 from './Header2Component'

import firebase from 'firebase'
import 'firebase/firestore'

import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/actions/userActions'
import { ScrollView } from 'react-native'
import { Text } from 'react-native'
import { FlatList } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { Input } from 'react-native-elements'

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.currentUser)
  const { loginUser } = currentUser

  const [Data, setData] = useState([])

  useEffect(() => {
    setData([])

    dispatch(fetchUser())

    if (loginUser.person == 'Teacher') {
      firebase
        .firestore()
        .collection('teachers')
        .doc(firebase.auth().currentUser.uid)
        .collection('Classes')
        .get()
        .then((result) => {
          result.forEach((doc) => {
            setData((Data) => [...Data, doc.data()])
          })
        })
    } else if (loginUser.person == 'Student') {
      firebase
        .firestore()
        .collection('students')
        .doc(firebase.auth().currentUser.uid)
        .collection('Classes')
        .get()
        .then((result) => {
          result.forEach((doc) => {
            setData((Data) => [...Data, doc.data()])
          })
        })
    }
  }, [dispatch])

  if (loginUser == undefined && Data == []) {
    return <ActivityIndicator size='large' color='#000000' />
  } else {
    return (
      <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
        <Header2 greeting='Profile' />
        {Array.isArray(Data) && Data.length ? (
          <ScrollView>
            <View style={styles.heading}>
              <Text style={{ fontSize: 27, color: '#252a34' }}>
                Personal Information
              </Text>
            </View>
            <View style={styles.innerPart}>
              <Input
                leftIcon={{
                  type: 'font-awesome',
                  name: 'odnoklassniki',
                  color: '#252a34',
                }}
                disabled
                value={loginUser.name}
                autoFocus={false}
                style={{ padding: 5 }}
              />
              <Input
                leftIcon={{
                  type: 'font-awesome',
                  name: 'angellist',
                  color: '#252a34',
                }}
                disabled
                value={loginUser.email}
                autoFocus={false}
                style={{ padding: 5 }}
              />
            </View>
            <View style={styles.heading}>
              <Text style={{ fontSize: 27, color: '#252a34' }}>
                Classes Information
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <View
                style={{
                  paddingHorizontal: 20,
                  backgroundColor: '#ff2e63',
                  borderRadius: 25,
                }}
              >
                <Text style={{ fontSize: 25, color: '#ffffff' }}>Title</Text>
              </View>
              <View
                style={{
                  paddingHorizontal: 20,
                  backgroundColor: '#ff2e63',
                  borderRadius: 25,
                }}
              >
                <Text style={{ fontSize: 25, color: '#ffffff' }}>Code</Text>
              </View>

              <View
                style={{
                  paddingHorizontal: 20,
                  backgroundColor: '#ff2e63',
                  borderRadius: 25,
                }}
              >
                <Text style={{ fontSize: 25, color: '#ffffff' }}>Quiz</Text>
              </View>
            </View>
            {Data.map((item, index) => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingVertical: 10,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>{item.ClassTitle}</Text>
                  <Text style={{ fontSize: 20 }}>{item.ClassCode}</Text>

                  {loginUser.person == 'Teacher' ? (
                    <View>
                      {item.TotalQuiz != undefined ? (
                        <Text style={{ fontSize: 20 }}>
                          {item.TotalQuiz.length}
                        </Text>
                      ) : (
                        <Text style={{ fontSize: 20 }}>-</Text>
                      )}
                    </View>
                  ) : (
                    <View>
                      {item.AttendanceDone != undefined ? (
                        <View>
                          {item.AttendanceAbsent != undefined ? (
                            <View>
                              <Text style={{ fontSize: 20 }}>
                                {item.AttendanceDone.length}/
                                {item.AttendanceDone.length}+
                                {item.AttendanceAbsent.length}
                              </Text>
                            </View>
                          ) : (
                            <View>
                              <Text style={{ fontSize: 20 }}>
                                {item.AttendanceDone.length}/
                                {item.AttendanceDone.length}
                              </Text>
                            </View>
                          )}
                        </View>
                      ) : (
                        <View>
                          {item.AttendanceAbsent != undefined ? (
                            <View>
                              <Text style={{ fontSize: 20 }}>
                                0/{item.AttendanceAbsent.length}
                              </Text>
                            </View>
                          ) : (
                            <View>
                              <Text style={{ fontSize: 20 }}>-</Text>
                            </View>
                          )}
                        </View>
                      )}
                    </View>
                  )}
                </View>
              )
            })}
          </ScrollView>
        ) : (
          <View style={{ flex: 11, alignItems: 'flex-start' }}>
            <View
              style={{
                flex: 1,
                margin: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: '#eaeaea',
                  backgroundColor: '#252a34',
                  borderRadius: 25,
                  padding: 5,
                  paddingHorizontal: '10%',
                }}
              >
                Profile Loading
              </Text>
            </View>
          </View>
        )}
      </View>
    )
  }
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  heading: {
    marginHorizontal: 25,
    marginBottom: 10,
  },
  head: {
    margin: 25,
  },
  innerPart: {
    marginHorizontal: 15,
    marginTop: 10,
  },
})
