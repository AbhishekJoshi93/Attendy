import React from 'react'
import { View } from 'react-native'

import Header2 from './Header2Component'

const ReportScreen = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: '#f7f6e7' }}>
      <Header2 greeting='Attendance Report' />
    </View>
  )
}

export default ReportScreen
