import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const Header2 = ({ navigation, greeting }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          color: '#314e52',
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
    padding: 25,
    flex: 1,
  },
})
