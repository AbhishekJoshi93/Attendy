import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
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
import { Button, Icon, Image } from 'react-native-elements'

import Modal from 'react-native-modal'
import { createPortal, render } from 'react-dom'
import { Portal } from 'react-native-paper'

const ClassHome = ({ navigation }) => {
  const dispatch = useDispatch()

  const currentClass = useSelector((state) => state.currentClass)
  const { loginClass } = currentClass

  const currentUser = useSelector((state) => state.currentUser)
  const { loginUser } = currentUser

  const [isModalVisible, setModalVisible] = useState(false)
  const [isModalVisible2, setModalVisible2] = useState(false)
  const [isModalVisiblePaper, setisModalVisiblePaper] = useState(false)

  const [Data, setData] = useState([])
  const [Refresh, setRefresh] = useState(false)
  const [ClassId, setClassId] = useState('')

  const [QuesArray, setQuesArray] = useState([])

  const [AnsA, setAnsA] = useState([])
  const [AnsB, setAnsB] = useState([])
  const [AnsC, setAnsC] = useState([])

  const [StudentAnswer, setStudentAnswer] = useState([])

  useEffect(() => {
    dispatch(fetchUser())
    refreshHandler()
  }, [dispatch, loginClass])

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2)
  }

  const toggleModalPaper = () => {
    setisModalVisiblePaper(!isModalVisiblePaper)
  }

  const QuestionHandler = () => {
    toggleModal()
  }
  const QuestionHandler2 = () => {
    setQuesArray([])
    toggleModal()
  }

  const AttendanceHandler = () => {
    toggleModal2()
  }
  const AttendanceHandler2 = () => {
    toggleModal2()
  }

  const StudentHandler = () => {
    toggleModalPaper()
  }

  const StudentHandler2 = () => {
    setAnsA([])
    setAnsB([])
    setAnsC([])
    setStudentAnswer([])
    setQuesArray([])
    toggleModalPaper()
  }

  const StudentHandlerCancel = () => {
    setAnsA([])
    setAnsB([])
    setAnsC([])
    setStudentAnswer([])
    setQuesArray([])
    toggleModalPaper()
  }

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

  if (loginClass == undefined && loginClass.Title == undefined) {
    return <ActivityIndicator size='large' color='#000000' />
  } else {
    return (
      <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
        <View style={styles.head}>
          <Text style={{ fontSize: 35, color: '#252a34' }}>
            Class: {loginClass.Title}
          </Text>
        </View>
        {Array.isArray(Data) && Data.length ? (
          <View style={{ flex: 11 }}>
            <ScrollView>
              <FlatList
                data={Data}
                keyExtractor={(items, index) => String(index)}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor: '#ff2e63',
                        margin: 15,
                        borderRadius: 25,
                      }}
                    >
                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: 35,
                          paddingHorizontal: 25,
                          paddingVertical: 10,
                        }}
                      >
                        {item.Title}
                      </Text>
                      <View
                        style={{
                          backgroundColor: '#252a34',
                          paddingHorizontal: 25,
                          paddingTop: 10,
                          borderRadius: 25,
                        }}
                      >
                        <Text style={{ color: '#ffffff', fontSize: 20 }}>
                          Cutoff: {item.Marks}/{item.Questions.length}
                        </Text>
                        <Text style={{ color: '#ffffff', fontSize: 20 }}>
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
                              onPress={() => {
                                item.Questions.map((itemQuestion, index) => {
                                  setQuesArray((QuesArray) => [
                                    ...QuesArray,
                                    itemQuestion,
                                  ])
                                })

                                QuestionHandler()
                              }}
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
                                    item.Questions.map(
                                      (itemQuestion, index) => {
                                        setQuesArray((QuesArray) => [
                                          ...QuesArray,
                                          itemQuestion,
                                        ])
                                        AnsA[index] = false
                                        AnsB[index] = false
                                        AnsC[index] = false
                                      }
                                    )
                                    StudentHandler()
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
                        backgroundColor='#ffffff'
                        onSwipeCancel={() => QuestionHandler2()}
                        swipeDirection='down'
                      >
                        <View style={{ paddingHorizontal: 10 }}>
                          {Array.isArray(QuesArray) && QuesArray.length ? (
                            <ScrollView>
                              <Text
                                style={{
                                  fontSize: 30,
                                  color: '#252a34',
                                  textAlign: 'center',
                                  marginVertical: 20,
                                }}
                              >
                                Questions
                              </Text>
                              {QuesArray.map((itemQuestion, index) => {
                                return (
                                  <View
                                    style={{
                                      backgroundColor: '#ff2e63',
                                      borderRadius: 25,
                                      marginBottom: 5,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 25,
                                        color: '#ffffff',
                                        padding: 20,
                                      }}
                                    >
                                      Q{index + 1}: {itemQuestion.Question}
                                    </Text>
                                    <View
                                      style={{
                                        backgroundColor: '#252a34',
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
                                              backgroundColor: '#eaeaea',
                                              borderRadius: 25,
                                              paddingHorizontal: 20,
                                              paddingVertical: 5,
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: '#252a34',
                                              }}
                                            >
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
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: '#ffffff',
                                              }}
                                            >
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
                                              backgroundColor: '#eaeaea',
                                              borderRadius: 25,
                                              paddingHorizontal: 20,
                                              paddingVertical: 5,
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: '#252a34',
                                              }}
                                            >
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
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: '#ffffff',
                                              }}
                                            >
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
                                              backgroundColor: '#eaeaea',
                                              borderRadius: 25,
                                              paddingHorizontal: 20,
                                              paddingVertical: 5,
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: '#252a34',
                                              }}
                                            >
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
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: '#ffffff',
                                              }}
                                            >
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
                        backgroundColor='#ffffff'
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
                      <Modal
                        isVisible={isModalVisiblePaper}
                        backgroundColor='#ffffff'
                      >
                        <View style={{ paddingHorizontal: 10 }}>
                          {Array.isArray(QuesArray) && QuesArray.length ? (
                            <ScrollView>
                              <Text
                                style={{
                                  fontSize: 30,
                                  color: '#252a34',
                                  textAlign: 'center',
                                  marginVertical: 20,
                                }}
                              >
                                Questions
                              </Text>
                              {QuesArray.map((itemQuestion, index) => {
                                return (
                                  <View
                                    style={{
                                      backgroundColor: '#ff2e63',
                                      borderRadius: 25,
                                      marginBottom: 5,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 25,
                                        color: '#ffffff',
                                        padding: 20,
                                      }}
                                    >
                                      Q{index + 1}: {itemQuestion.Question}
                                    </Text>
                                    <View
                                      style={{
                                        backgroundColor: '#252a34',
                                        padding: 5,
                                        borderBottomRightRadius: 25,
                                        borderBottomLeftRadius: 25,
                                      }}
                                    >
                                      <View>
                                        {AnsA[index] ? (
                                          <TouchableOpacity
                                            style={{
                                              backgroundColor: '#eaeaea',
                                              borderRadius: 25,
                                              paddingHorizontal: 20,
                                              paddingVertical: 5,
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: '#252a34',
                                              }}
                                            >
                                              A. {itemQuestion.OptionA}
                                            </Text>
                                          </TouchableOpacity>
                                        ) : (
                                          <TouchableOpacity
                                            style={{
                                              paddingHorizontal: 20,
                                              paddingVertical: 5,
                                            }}
                                            onPress={() => {
                                              StudentAnswer[index] = 'A'
                                              AnsA[index] = true
                                              AnsB[index] = false
                                              AnsC[index] = false
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: '#ffffff',
                                              }}
                                            >
                                              A. {itemQuestion.OptionA}
                                            </Text>
                                          </TouchableOpacity>
                                        )}
                                        {AnsB[index] ? (
                                          <TouchableOpacity
                                            style={{
                                              backgroundColor: '#eaeaea',
                                              borderRadius: 25,
                                              paddingHorizontal: 20,
                                              paddingVertical: 5,
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: '#252a34',
                                              }}
                                            >
                                              B. {itemQuestion.OptionB}
                                            </Text>
                                          </TouchableOpacity>
                                        ) : (
                                          <TouchableOpacity
                                            style={{
                                              paddingHorizontal: 20,
                                              paddingVertical: 5,
                                            }}
                                            onPress={() => {
                                              StudentAnswer[index] = 'B'
                                              AnsA[index] = false
                                              AnsB[index] = true
                                              AnsC[index] = false
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: '#ffffff',
                                              }}
                                            >
                                              B. {itemQuestion.OptionB}
                                            </Text>
                                          </TouchableOpacity>
                                        )}
                                        {AnsC[index] ? (
                                          <TouchableOpacity
                                            style={{
                                              backgroundColor: '#eaeaea',
                                              borderRadius: 25,
                                              paddingHorizontal: 20,
                                              paddingVertical: 5,
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: '#252a34',
                                              }}
                                            >
                                              C. {itemQuestion.OptionC}
                                            </Text>
                                          </TouchableOpacity>
                                        ) : (
                                          <TouchableOpacity
                                            style={{
                                              paddingHorizontal: 20,
                                              paddingVertical: 5,
                                            }}
                                            onPress={() => {
                                              StudentAnswer[index] = 'C'
                                              AnsA[index] = false
                                              AnsB[index] = false
                                              AnsC[index] = true
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                color: '#ffffff',
                                              }}
                                            >
                                              C. {itemQuestion.OptionC}
                                            </Text>
                                          </TouchableOpacity>
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
                          <View
                            style={{
                              marginTop: 10,
                              flexDirection: 'row',
                              justifyContent: 'center',
                            }}
                          >
                            <View style={{ marginHorizontal: 5 }}>
                              <Button
                                title='Submit'
                                type='outline'
                                raised
                                onPress={() => StudentHandler2()}
                              />
                            </View>
                            <View style={{ marginHorizontal: 5 }}>
                              <Button
                                title='Cancel'
                                type='outline'
                                raised
                                onPress={() => StudentHandlerCancel()}
                              />
                            </View>
                          </View>
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
                    color: '#eaeaea',
                    backgroundColor: '#252a34',
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

const styles = StyleSheet.create({
  head: {
    margin: 25,
  },
})
