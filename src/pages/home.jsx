import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native';
import Colors from '../../color.config';
import {useNavigation } from '@react-navigation/native';
import {Btn} from "../components/Buttons"
import { ScaledSheet } from 'react-native-size-matters'
import DisplayCard from '../components/DisplayCard';



function Home() {

    const navigation = useNavigation()

  return (
    <SafeAreaView>
      <View
        style={{backgroundColor : Colors['white-1'], height : "100%", paddingTop : 22}}
        >
          <View style={{paddingHorizontal : 13}}>
            <Text style={{
              color : Colors['black-1'],
              fontSize : 40,
              fontFamily : "Inter-Variable",
              fontWeight : "650"
            }}>Notes</Text>
            <Btn style={styles.searchBarCont} text="Search notes" textStyle={styles.searchBarText} />
          </View>
          <ScrollView
            style={{marginTop : 22, paddingHorizontal : 13}}
            contentInsetAdjustmentBehavior="automatic"
            >
            <DisplayCard />
            <DisplayCard />
            <DisplayCard />
            <DisplayCard />
            <DisplayCard />
            <DisplayCard />
            <DisplayCard />
            <DisplayCard />
            <DisplayCard />
            <DisplayCard />
            <DisplayCard />
            <DisplayCard />
            <DisplayCard />
          </ScrollView>
          <Btn
              onPress={() => navigation.navigate('EditView')}
              text='+'
              style={styles.NewNoteBtn}
              textStyle={styles.NewNoteBtnText}
              elevation={1}
          />
      </View>
    </SafeAreaView> 
  );
}

const styles = ScaledSheet.create({
  searchBarCont : {
    height : "36@vs",
    width : "100%",
    backgroundColor : Colors.cream,
    borderRadius : 100,
    marginTop : 18,
    paddingHorizontal : 13,
    paddingVertical : "8.5@vs"
  },
  searchBarText : {
    color : Colors['black-1'],
    fontSize : 16,
    opacity : 0.7,
    fontFamily : "Inter-Variable",
    fontWeight : '100'
  },
  NewNoteBtn : {
    height : "43@vs",
    width : "43@vs",
    backgroundColor : Colors['cream'],
    borderRadius : 100,
    position : "absolute",
    left : "44%",
    bottom : 20,
    padding : "10@vs",
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  NewNoteBtnText : {
    color : Colors['white-1'],
    fontFamily : "Inter-Variable"
  }
})

export default Home;
