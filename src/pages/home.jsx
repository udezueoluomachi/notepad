import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import Colors from '../../color.config';
import {useNavigation } from '@react-navigation/native';


function Home() {

    const navigation = useNavigation()

  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={Colors['white-1']}
        barStyle="dark-content"
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        >
        <Text>Hello</Text>
        <Button
            onPress={() => navigation.navigate('EditView')}
            title='navigate'
            sty
        />
      </ScrollView>
    </SafeAreaView> 
  );
}

export default Home;
