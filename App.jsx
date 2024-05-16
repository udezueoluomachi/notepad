import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from './color.config';


function App() {

  return (
    <SafeAreaView>
      <StatusBar
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        >
        <Text>Hello</Text>
      </ScrollView>
    </SafeAreaView> 
  );
}

export default App;
