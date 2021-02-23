import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, LogBox } from 'react-native'

import Header from './HeaderComponent'

import firebase from 'firebase'
import 'firebase/firestore'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Button } from 'react-native'
import { Icon } from 'react-native-elements'

const HomeScreen = ({ navigation }) => {
  const [Data, setData] = useState([])
  const [Refresh, setRefresh] = useState(false)

  useEffect(() => {
    LogBox.ignoreAllLogs()
    refreshHandler()
  }, [])

  const navigationHandler = () => {
    navigation.navigate('Root2', { screen: 'Class Home' })
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
    <View style={{ backgroundColor: '#f7f6e7', flex: 1 }}>
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
                          backgroundColor: '#314e52',
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
                            marginBottom: -20,
                          }}
                        >
                          <Icon
                            raised
                            name='telegram'
                            type='font-awesome'
                            color=''
                            onPress={() => navigationHandler()}
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
                  color: '#e7e6e1',
                  backgroundColor: '#314e52',
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
    backgroundColor: '#e7e6e1',
    margin: 10,
    alignItems: 'baseline',
    borderRadius: 25,
  },
  textstyleHeader: {
    paddingHorizontal: 20,
    color: '#f2a154',
    fontSize: 50,
  },
  textstyleDes: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#e7e6e1',
    fontSize: 20,
  },
})
