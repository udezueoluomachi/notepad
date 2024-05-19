import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../../color.config';


function EditView() {

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        >
        <Text>Hello app 2</Text>
      </ScrollView>
    </SafeAreaView> 
  );
}

export default EditView;
