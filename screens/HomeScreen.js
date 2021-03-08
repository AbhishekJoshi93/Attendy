import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, LogBox } from 'react-native'

import Header from './HeaderComponent'

import { useDispatch, useSelector } from 'react-redux'
import { fetchClass, fetchClassCode } from '../redux/actions/classActions'

import firebase from 'firebase'
import 'firebase/firestore'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { ActivityIndicator } from 'react-native'

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const [Data, setData] = useState([])
  const [Refresh, setRefresh] = useState(false)

  useEffect(() => {
    LogBox.ignoreAllLogs()
    refreshHandler()
  }, [])

  const navigationHandler = (ItemCode) => {
    dispatch(fetchClass(ItemCode))
    navigation.navigate('Root2', {
      screen: 'Class Home',
    })
  }

  const refreshHandler = () => {
    setData([])
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('class')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setData((Data) => [...Data, doc.data()])
        })
        setRefresh(false)
      })
  }

  return (
    <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
      <Header greeting='Hello' />
      <View style={{ flex: 11, alignItems: 'flex-start' }}>
        {Array.isArray(Data) && Data.length ? (
          <ScrollView>
            <FlatList
              data={Data}
              keyExtractor={(item) => {
                return item.Code
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity>
                    <View style={styles.flatlistContainer} key={item.Code}>
                      <Text style={styles.textstyleHeader}>{item.Title}</Text>
                      <View
                        style={{
                          backgroundColor: '#252a34',
                          width: '100%',
                          borderRadius: 25,
                        }}
                      >
                        <Text style={styles.textstyleDes}>
                          {item.Des} - {item.Code}
                        </Text>
                        <View
                          style={{
                            alignSelf: 'flex-end',
                            marginBottom: -18,
                          }}
                        >
                          <Icon
                            raised
                            name='telegram'
                            type='font-awesome'
                            color=''
                            onPress={() => {
                              navigationHandler(item.Code)
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }}
              refreshing={Refresh}
              onRefresh={() => refreshHandler()}
            />
          </ScrollView>
        ) : (
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
                  color: '#ffffff',
                  backgroundColor: '#252a34',
                  borderRadius: 25,
                  padding: 5,
                  paddingHorizontal: '10%',
                }}
              >
                No Classes
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  flatlistContainer: {
    flex: 1,
    backgroundColor: '#ff2e63',
    margin: 10,
    alignItems: 'baseline',
    borderRadius: 25,
    marginBottom: 12,
  },
  textstyleHeader: {
    paddingHorizontal: 20,
    color: '#ffffff',
    fontSize: 50,
  },
  textstyleDes: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 20,
  },
})
