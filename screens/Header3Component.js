import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const Header2 = ({ navigation, greeting }) => {
  return (
    <View style={styles.container}>
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
        {greeting}
      </Text>
    </View>
  )
}

export default Header2

const styles = StyleSheet.create({
  container: {
    marginVertical: '-15%',
    alignItems: 'center',
    flex: 1,
  },
})
