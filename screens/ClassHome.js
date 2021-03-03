import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { View, Text } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { fetchClassCode } from '../redux/actions/classActions'

import firebase from 'firebase'
import 'firebase/firestore'
import { ScrollView } from 'react-native'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Header2 from './Header2Component'
import { Icon } from 'react-native-elements'

const ClassHome = ({ navigation }) => {
  const dispatch = useDispatch()

  const currentClass = useSelector((state) => state.currentClass)
  const { loginClass } = currentClass

  const [Data, setData] = useState([])
  const [Refresh, setRefresh] = useState(false)
  const [ClassId, setClassId] = useState('')

  useEffect(() => {
    if (loginClass.Code == undefined) {
      return <ActivityIndicator size='large' color='#000000' />
    } else {
      refreshHandler()
    }
  }, [loginClass])

  const refreshHandler = () => {
    setData([])

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
                keyExtractor={(item) => {
                  return item
                }}
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
                            onPress={() => {}}
                          />
                          <Icon
                            raised
                            name='flag'
                            type='font-awesome'
                            color=''
                            onPress={() => {}}
                          />
                        </View>
                      </View>
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
