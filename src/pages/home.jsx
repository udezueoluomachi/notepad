import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Button
} from 'react-native';
import Colors from '../../color.config';
import {useNavigation } from '@react-navigation/native';
import {Btn} from "../components/Buttons"
import { ScaledSheet } from 'react-native-size-matters';



function Home() {

    const navigation = useNavigation()

  return (
    <SafeAreaView>
      <View
        style={{backgroundColor : Colors['white-1'], height : "100%", paddingTop : 22, paddingHorizontal : 13}}
        >
          <View>
            <Text style={{
              color : Colors['black-1'],
              fontSize : 40,
              fontFamily : "Inter-Variable",
              fontWeight : "400"
            }}>Notes</Text>
          </View>
          <Btn style={styles.searchBarCont} text="Search notes" textStyle={styles.searchBarText} />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            >
            <Text>Hello</Text>
            <Btn
                onPress={() => navigation.navigate('EditView')}
                text='navigate'
                style={{
                  backgroundColor : Colors.cream,
                  width : 200,
                  padding : 5
                }}
            />
          </ScrollView>
      </View>
    </SafeAreaView> 
  );
}

const styles = ScaledSheet.create({
  searchBarCont : {
    height : "36@mvs",
    width : "100%",
    backgroundColor : Colors.cream,
    borderRadius : 100,
    marginTop : 18,
    paddingHorizontal : 13,
    paddingVertical : "8.5@vs"
  },
  searchBarText : {
    color : Colors['black-1'],
    fontSize : 16
  }
})

export default Home;
