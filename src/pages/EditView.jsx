import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../../color.config';


function EditView() {

  return (
    <SafeAreaView>
      <StatusBar
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        >
        <Text>Hello app 2</Text>
      </ScrollView>
    </SafeAreaView> 
  );
}

export default EditView;
