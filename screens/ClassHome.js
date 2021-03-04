import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { View, Text } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { fetchClassCode } from '../redux/actions/classActions'
import { fetchUser } from '../redux/actions/userActions'

import firebase from 'firebase'
import 'firebase/firestore'
import { ScrollView } from 'react-native'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Header2 from './Header2Component'
import { Button, Icon } from 'react-native-elements'

import Modal from 'react-native-modal'
import { render } from 'react-dom'

const ClassHome = ({ navigation }) => {
  const dispatch = useDispatch()

  const currentClass = useSelector((state) => state.currentClass)
  const { loginClass } = currentClass

  const currentUser = useSelector((state) => state.currentUser)
  const { loginUser } = currentUser

  const [isModalVisible, setModalVisible] = useState(false)
  const [isModalVisible2, setModalVisible2] = useState(false)

  const [Data, setData] = useState([])
  const [Refresh, setRefresh] = useState(false)
  const [ClassId, setClassId] = useState('')

  const [QuesArray, setQuesArray] = useState([])

  useEffect(() => {
    dispatch(fetchUser())
    refreshHandler()
  }, [dispatch])

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2)
  }

  const QuestionHandler = () => {
    toggleModal()
  }
  const QuestionHandler2 = () => {
    toggleModal()
  }

  const AttendanceHandler = () => {
    toggleModal2()
  }
  const AttendanceHandler2 = () => {
    toggleModal2()
  }

  const StudentHandler = () => {}

  const refreshHandler = () => {
    setData([])
    if (loginClass.Code == undefined) {
      return <ActivityIndicator size='large' color='#000000' />
    } else {
      firebase
        .firestore()
        .collection('classes')
        .where('Code', '==', loginClass.Code)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setClassId(doc.id)
          })
        })
        .catch((error) => {
          Alert.alert('Class cannot found')
          return
        })
    }
    if (ClassId == '') {
      return <ActivityIndicator size='large' color='#000000' />
    }
    if (ClassId != '') {
      firebase
        .firestore()
        .collection('classes')
        .doc(ClassId)
        .collection('quiz')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            setData((Data) => [...Data, doc.data()])
          })
          setRefresh(false)
        })
    }
  }

  if (loginClass == undefined) {
    return <ActivityIndicator size='large' color='#000000' />
  } else {
    return (
      <View style={{ backgroundColor: '#f7f6e7', flex: 1 }}>
        <Header2 greeting={'Class: ' + loginClass.Title} />
        {Array.isArray(Data) && Data.length ? (
          <View style={{ flex: 11 }}>
            <ScrollView>
              <FlatList
                data={Data}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item }) => {
                  return (
                    <View
                      key={item}
                      style={{
                        backgroundColor: '#e7e6e1',
                        margin: 15,
                        borderRadius: 25,
                      }}
                    >
                      <Text
                        style={{
                          color: '#f2a154',
                          fontSize: 35,
                          paddingHorizontal: 25,
                          paddingVertical: 10,
                        }}
                      >
                        {item.Title}
                      </Text>
                      <View
                        style={{
                          backgroundColor: '#314e52',
                          paddingHorizontal: 25,
                          paddingTop: 10,
                          borderRadius: 25,
                        }}
                      >
                        <Text style={{ color: '#e7e6e1', fontSize: 20 }}>
                          Cutoff: {item.Questions.length}/{item.Marks}
                        </Text>
                        <Text style={{ color: '#e7e6e1', fontSize: 20 }}>
                          Day: {item.DateTime.toDate().toLocaleDateString()},
                          Time:{' '}
                          {item.DateTime.toDate().toLocaleTimeString('en-US')}
                        </Text>
                        {loginUser.person == 'Teacher' ? (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              alignSelf: 'center',
                              marginBottom: -20,
                            }}
                          >
                            <Icon
                              raised
                              name='list-alt'
                              type='font-awesome'
                              color=''
                              onPress={(item) => QuestionHandler(item)}
                            />
                            <Icon
                              raised
                              name='flag'
                              type='font-awesome'
                              color=''
                              onPress={() => AttendanceHandler()}
                            />
                          </View>
                        ) : (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              alignSelf: 'center',
                              marginBottom: -20,
                            }}
                          >
                            {item.DateTime.seconds <
                            parseInt(new Date().getTime() / 1000) ? (
                              <View>
                                <Icon
                                  raised
                                  name='arrow-circle-up'
                                  type='font-awesome'
                                  color=''
                                  onPress={() => {
                                    console.log(item.DateTime), StudentHandler()
                                  }}
                                />
                              </View>
                            ) : (
                              <View>
                                <Icon
                                  raised
                                  name='lock'
                                  type='font-awesome'
                                  color=''
                                  disabled={true}
                                />
                              </View>
                            )}
                          </View>
                        )}
                      </View>
                      <Modal
                        isVisible={isModalVisible}
                        backgroundColor='#e7e6e1'
                        onSwipeCancel={() => QuestionHandler2()}
                        swipeDirection='down'
                      >
                        <View style={{ paddingHorizontal: 10 }}>
                          {Array.isArray(item.Questions) &&
                          item.Questions.length ? (
                            <ScrollView>
                              <Text
                                style={{
                                  fontSize: 30,
                                  color: '#314e52',
                                  textAlign: 'center',
                                  marginVertical: 20,
                                }}
                              >
                                Questions
                              </Text>
                              {item.Questions.map((itemQuestion, index) => {
                                return (
                                  <View
                                    style={{
                                      backgroundColor: '#314e52',
                                      borderRadius: 25,
                                      marginBottom: 5,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 25,
                                        color: '#e7e6e1',
                                        padding: 20,
                                      }}
                                    >
                                      Q{index + 1}: {itemQuestion.Question}
                                    </Text>
                                    <View
                                      style={{
                                        backgroundColor: '#f2a154',
                                        padding: 5,
                                        borderBottomRightRadius: 25,
                                        borderBottomLeftRadius: 25,
                                      }}
                                    >
                                      <View>
                                        {itemQuestion.Answer === 'A' ||
                                        itemQuestion.Answer === 'a' ? (
                                          <View
                                            style={{
                                              backgroundColor: '#e7e6e1',
                                              borderRadius: 25,
                                              paddingHorizontal: 20,
                                              paddingVertical: 5,
                                            }}
                                          >
                                            <Text style={{ fontSize: 20 }}>
                                              A. {itemQuestion.OptionA}
                                            </Text>
                                          </View>
                                        ) : (
                                          <View
                                            style={{
                                              paddingHorizontal: 20,
                                              paddingVertical: 5,
                                            }}
                                          >
                                            <Text style={{ fontSize: 20 }}>
                                              A. {itemQuestion.OptionA}
                                            </Text>
                                          </View>
                                        )}
                                      </View>
                                      <View>
                                        {itemQuestion.Answer === 'B' ||
                                        itemQuestion.Answer === 'b' ? (
                                          <View
                                            style={{
                                              backgroundColor: '#e7e6e1',
                                              borderRadius: 25,
                                              paddingHorizontal: 20,
                                              paddingVertical: 5,
                                            }}
                                          >
                                            <Text style={{ fontSize: 20 }}>
                                              B. {itemQuestion.OptionB}
                                            </Text>
                                          </View>
                                        ) : (
                                          <View
                                            style={{
                                              paddingHorizontal: 20,
                                              paddingVertical: 5,
                                            }}
                                          >
                                            <Text style={{ fontSize: 20 }}>
                                              B. {itemQuestion.OptionB}
                                            </Text>
                                          </View>
                                        )}
                                      </View>
                                      <View>
                                        {itemQuestion.Answer === 'C' ||
                                        itemQuestion.Answer === 'c' ? (
                                          <View
                                            style={{
                                              backgroundColor: '#e7e6e1',
                                              borderRadius: 25,
                                              paddingHorizontal: 20,
                                              paddingVertical: 5,
                                            }}
                                          >
                                            <Text style={{ fontSize: 20 }}>
                                              C. {itemQuestion.OptionC}
                                            </Text>
                                          </View>
                                        ) : (
                                          <View
                                            style={{
                                              paddingHorizontal: 20,
                                              paddingVertical: 5,
                                            }}
                                          >
                                            <Text style={{ fontSize: 20 }}>
                                              C. {itemQuestion.OptionC}
                                            </Text>
                                          </View>
                                        )}
                                      </View>
                                    </View>
                                  </View>
                                )
                              })}
                            </ScrollView>
                          ) : (
                            <View style={{ marginTop: 50 }}>
                              <Image
                                source={require('../assets/images/add.png')}
                                style={{ width: 380, height: 300 }}
                              />
                              <View style={{ alignItems: 'center' }}>
                                <Text
                                  style={{
                                    fontSize: 25,
                                    color: '#e7e6e1',
                                    backgroundColor: '#314e52',
                                    borderRadius: 25,
                                    padding: 5,
                                    width: '50%',
                                    textAlign: 'center',
                                  }}
                                >
                                  No Question
                                </Text>
                              </View>
                            </View>
                          )}
                        </View>
                      </Modal>
                      <Modal
                        isVisible={isModalVisible2}
                        backgroundColor='#e7e6e1'
                      >
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Button
                            title='Close Attendance'
                            type='outline'
                            raised
                            onPress={() => AttendanceHandler2()}
                          />
                        </View>
                      </Modal>
                    </View>
                  )
                }}
                refreshing={Refresh}
                onRefresh={() => refreshHandler()}
              />
            </ScrollView>
          </View>
        ) : (
          <View style={{ flex: 11, alignItems: 'flex-start' }}>
            <View
              style={{
                flex: 1,
                margin: 20,
              }}
            >
              <TouchableOpacity onPress={() => refreshHandler()}>
                <Text
                  style={{
                    fontSize: 25,
                    color: '#e7e6e1',
                    backgroundColor: '#314e52',
                    borderRadius: 25,
                    padding: 5,
                    paddingHorizontal: '10%',
                  }}
                >
                  Load Quiz
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    )
  }
}

export default ClassHome
