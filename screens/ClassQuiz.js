import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { fetchUser } from '../redux/actions/userActions'

import { useDispatch, useSelector } from 'react-redux'
import { Button, Icon, Image, Input } from 'react-native-elements'

import Modal from 'react-native-modal'
import { TextInput } from 'react-native'
import { ScrollView } from 'react-native'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'

import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { render } from 'react-dom'
import { Alert } from 'react-native'

import firebase from 'firebase'
import 'firebase/firestore'
import { ActivityIndicator } from 'react-native'

import MapView, { Callout, Circle, Marker } from 'react-native-maps'
import Geocoder from 'react-native-geocoder'
import { log } from 'react-native-reanimated'

const ClassQuiz = ({ navigation }) => {
  const dispatch = useDispatch()

  const currentClass = useSelector((state) => state.currentClass)
  const { loginClass } = currentClass

  const currentUser = useSelector((state) => state.currentUser)
  const { loginUser } = currentUser

  const [Title, setTitle] = useState('')
  const [Marks, setMarks] = useState(0)

  const [DateTime, setDateTime] = useState(new Date())

  const [isModalVisible, setModalVisible] = useState(false)

  const [Ques, setQues] = useState([])
  const [Ans, setAns] = useState([])
  const [OptionA, setOptionA] = useState([])
  const [OptionB, setOptionB] = useState([])
  const [OptionC, setOptionC] = useState([])

  const [Question, setQuestion] = useState('')
  const [Answer, setAnswer] = useState('')
  const [OptA, setOptA] = useState('')
  const [OptB, setOptB] = useState('')
  const [OptC, setOptC] = useState('')

  const [Heading, setHeading] = useState('')

  const [ClassId, setClassId] = useState('')

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const [isMapVisible, setMapVisible] = useState(false)

  const [reg, setReg] = useState({
    latitude: 22.310696,
    longitude: 73.192635,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (datetime) => {
    setDateTime(datetime)
    setHeading('Date')
    hideDatePicker()
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const resetStateHandler = () => {
    setQues([])
    setAns([])
    setOptionA([])
    setOptionB([])
    setOptionC([])
    setTitle('')
    setMarks(0)
    setDateTime(new Date())
    setHeading('')
  }

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  if (loginClass == undefined) {
    return <ActivityIndicator size='large' color='#000000' />
  }

  const toggleMapModal = () => {
    setMapVisible(!isMapVisible)
  }

  const LocationHandler = () => {
    toggleMapModal()
  }

  const CloseLocationHandler = () => {
    toggleMapModal()
  }

  const SelectLocationHandler = () => {
    toggleMapModal()
  }

  const createQuizHandler = () => {
    if (Title !== '' && Marks !== '') {
      if (Array.isArray(Ques) && Ques.length) {
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
        if (ClassId == '') {
          return <ActivityIndicator size='large' color='#000000' />
        }
        if (ClassId != '') {
          firebase
            .firestore()
            .collection('classes')
            .doc(ClassId)
            .collection('quiz')
            .add({
              Title,
              Marks,
              DateTime,
              Code: (+new Date()).toString(36).slice(-5),
            })
            .then((result) => {
              var x = 0
              while (x < Ques.length) {
                firebase
                  .firestore()
                  .collection('classes')
                  .doc(ClassId)
                  .collection('quiz')
                  .doc(result.id)
                  .update({
                    Questions: firebase.firestore.FieldValue.arrayUnion({
                      Question: `${Ques[x]}`,
                      Answer: `${Ans[x]}`,
                      OptionA: `${OptionA[x]}`,
                      OptionB: `${OptionB[x]}`,
                      OptionC: `${OptionC[x]}`,
                    }),
                  })
                x++
              }

              firebase
                .firestore()
                .collection('teachers')
                .doc(firebase.auth().currentUser.uid)
                .collection('Classes')
                .doc(ClassId)
                .update({
                  TotalQuiz: firebase.firestore.FieldValue.arrayUnion({
                    QuizId: result.id,
                  }),
                })

              Alert.alert('Quiz Created')
              resetStateHandler()
              navigation.navigate('Class Home')
            })
            .catch((error) => {
              Alert.alert('Quiz cannot created')
              return
            })
        }
      } else {
        Alert.alert('Enter Questions')
      }
    } else {
      Alert.alert('Enter Title and Marks')
    }
  }

  const createQuestion = () => {
    setQuestion('')
    setAnswer('')
    setOptA('')
    setOptB('')
    setOptC('')
    toggleModal()
  }

  const updateHandler = () => {
    if (
      Question !== '' &&
      Answer !== '' &&
      OptA !== '' &&
      OptB !== '' &&
      OptC !== ''
    ) {
      setQues((Ques) => [...Ques, Question])
      setAns((Ans) => [...Ans, Answer])
      setOptionA((OptionA) => [...OptionA, OptA])
      setOptionB((OptionB) => [...OptionB, OptB])
      setOptionC((OptionC) => [...OptionC, OptC])
      setQuestion('')
      setAnswer('')
      setOptA('')
      setOptB('')
      setOptC('')
    }
    toggleModal()
  }

  return (
    <ScrollView
      style={{
        backgroundColor: '#ffffff',
        flex: 2,
      }}
    >
      <View style={styles.head}>
        {Heading !== '' ? (
          <Text style={{ fontSize: 25, color: '#252a34' }}>
            Date: {DateTime.toLocaleDateString()}, Time:
            {DateTime.toLocaleTimeString('en-US')}
          </Text>
        ) : (
          <Text style={{ fontSize: 35, color: '#252a34' }}>Quiz Details</Text>
        )}
      </View>
      {loginUser.person == 'Teacher' ? (
        <View style={styles.container}>
          <Input
            leftIcon={{
              type: 'font-awesome',
              name: 'bullhorn',
              color: '#252a34',
            }}
            placeholder='Enter quiz title'
            onChangeText={(title) => setTitle(title)}
            value={Title}
            autoFocus={false}
            style={{ padding: 5 }}
          />
          <Input
            leftIcon={{
              type: 'font-awesome',
              name: 'bullseye',
              color: '#252a34',
            }}
            placeholder='Enter minimum marks'
            onChangeText={(marks) => setMarks(marks)}
            value={Marks.toString()}
            keyboardType='phone-pad'
            autoFocus={false}
            style={{ padding: 5 }}
          />

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}
          >
            <View style={{ paddingHorizontal: 2 }}>
              <Button
                type='outline'
                title='Date & Time'
                onPress={showDatePicker}
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode='datetime'
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
            <View style={{ paddingHorizontal: 2 }}>
              <Button
                title='Add Question'
                type='outline'
                onPress={() => createQuestion()}
              />
            </View>
            <View style={{ paddingHorizontal: 2 }}>
              <Button
                title='Select Location'
                type='outline'
                onPress={() => LocationHandler()}
              />
            </View>
          </View>

          {Array.isArray(Ques) && Ques.length ? (
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
              <FlatList
                data={Ques}
                extraData={Ans}
                keyExtractor={(Ans) => {
                  return Ans
                }}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        backgroundColor: '#ff2e63',
                        borderRadius: 25,
                        marginBottom: 5,
                      }}
                    >
                      <Text
                        style={{ fontSize: 25, color: '#ffffff', padding: 20 }}
                      >
                        Q{index + 1}: {Ques[index]}
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
                          {Ans[index] === 'A' || Ans[index] === 'a' ? (
                            <View
                              style={{
                                backgroundColor: '#eaeaea',
                                borderRadius: 25,
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                              }}
                            >
                              <Text style={{ fontSize: 20, color: '#252a34' }}>
                                A. {OptionA[index]}
                              </Text>
                            </View>
                          ) : (
                            <View
                              style={{
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                              }}
                            >
                              <Text style={{ fontSize: 20, color: '#ffffff' }}>
                                A. {OptionA[index]}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View>
                          {Ans[index] === 'B' || Ans[index] === 'b' ? (
                            <View
                              style={{
                                backgroundColor: '#eaeaea',
                                borderRadius: 25,
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                              }}
                            >
                              <Text style={{ fontSize: 20, color: '#252a34' }}>
                                B. {OptionB[index]}
                              </Text>
                            </View>
                          ) : (
                            <View
                              style={{
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                              }}
                            >
                              <Text style={{ fontSize: 20, color: '#ffffff' }}>
                                B. {OptionB[index]}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View>
                          {Ans[index] === 'C' || Ans[index] === 'c' ? (
                            <View
                              style={{
                                backgroundColor: '#eaeaea',
                                borderRadius: 25,
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                              }}
                            >
                              <Text style={{ fontSize: 20, color: '#252a34' }}>
                                C. {OptionC[index]}
                              </Text>
                            </View>
                          ) : (
                            <View
                              style={{
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                              }}
                            >
                              <Text style={{ fontSize: 20, color: '#ffffff' }}>
                                C. {OptionC[index]}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                      {/* <Text style={{ fontSize: 25 }}>
                        A{index + 1}: {Ans[index]}
                      </Text> */}
                    </View>
                  )
                }}
              />
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
                    color: '#ffffff',
                    backgroundColor: '#252a34',
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

          <Modal isVisible={isMapVisible} backgroundColor='#ffffff'>
            <Text
              style={{
                fontSize: 30,
                color: '#252a34',
                textAlign: 'center',
                marginTop: 20,
              }}
            >
              Google Map
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MapView
                initialRegion={{
                  reg,
                }}
                style={{ height: '90%', width: '90%' }}
                onRegionChange={(region) => {
                  setReg(region)
                }}
              >
                <Marker.Animated
                  coordinate={{
                    latitude: reg.latitude,
                    longitude: reg.longitude,
                  }}
                />
              </MapView>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 20,
              }}
            >
              <View style={{ marginHorizontal: 5 }}>
                <Button
                  title='Close Location'
                  type='outline'
                  raised
                  onPress={() => CloseLocationHandler()}
                />
              </View>
              <View style={{ marginHorizontal: 5 }}>
                <Button
                  title='Select Location'
                  type='outline'
                  raised
                  onPress={() => SelectLocationHandler()}
                />
              </View>
            </View>
          </Modal>

          <Modal isVisible={isModalVisible} backgroundColor='#ffffff'>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Input
                leftIcon={{
                  type: 'font-awesome',
                  name: 'quora',
                  color: '#252a34',
                }}
                placeholder='Enter Question ?'
                onChangeText={(cquestion) => setQuestion(cquestion)}
                autoFocus={false}
                style={{ padding: 5 }}
              />

              <Input
                placeholder='Option A'
                onChangeText={(ca) => setOptA(ca)}
                autoFocus={false}
                style={{ padding: 5 }}
              />
              <Input
                placeholder='Option B'
                onChangeText={(cb) => setOptB(cb)}
                autoFocus={false}
                style={{ padding: 5 }}
              />
              <Input
                placeholder='Option C'
                onChangeText={(cc) => setOptC(cc)}
                autoFocus={false}
                style={{ padding: 5 }}
              />

              <Input
                leftIcon={{
                  type: 'font-awesome',
                  name: 'arrow-circle-right',
                  color: '#252a34',
                }}
                placeholder='Enter Answer - A/B/C'
                onChangeText={(canswer) => setAnswer(canswer)}
                autoFocus={false}
                style={{ padding: 5 }}
              />

              <Button
                title='Set Question'
                type='outline'
                raised
                onPress={() => updateHandler()}
              />
            </View>
          </Modal>
        </View>
      ) : (
        <View style={styles.container2}>
          <Icon raised name='lock' type='font-awesome' color='#252a34' />
        </View>
      )}
      <View style={{ marginHorizontal: 40, marginBottom: 20 }}>
        <Button
          title='Create Quiz'
          type='outline'
          onPress={() => createQuizHandler()}
        />
      </View>
    </ScrollView>
  )
}

export default ClassQuiz

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  container2: {
    flex: 1,
    alignSelf: 'center',
    paddingVertical: '65%',
  },
  head: {
    margin: 25,
    marginBottom: 10,
  },
})
