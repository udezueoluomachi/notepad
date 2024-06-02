import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Colors from '../../color.config';
import {useNavigation } from '@react-navigation/native';
import { ScaledSheet } from 'react-native-size-matters'
import {Btn} from "../components/Buttons"
import DisplayCard from '../components/DisplayCard';
import { Iconify } from 'react-native-iconify';
import {setItem, getItem, removeItem} from "../functions/encrypted-storage"
import moment from 'moment';

function Home({route}) {
  const listOfNotes = []
  const [notesToDisplay, setNotesToDisplay] = useState(<Text style={{
    textAlign : "center",
    color : Colors['black-1'],
    fontFamily : "Inter-Variable",
    fontSize : 14
  }}>Your notes would appear here. Click the "+" button to create a new note</Text>)

  const navigation = useNavigation()
  useEffect( () => {
    (async () => {
      const notes = await getItem("notes")
      if(!notes) {
        await setItem("notes", JSON.stringify([{
          date : new Date().toString(),
          title : "Welcome to Notes",
          note : `Welcome! Capture anything with Notes on.

Create a note by tapping "+" in the bottom-right corner of the homepage.

Feel free to tell us your comments or suggestions.`
        }]))
      }
      listOfNotes.push(...JSON.parse(await getItem("notes")).reverse())
      setNotesToDisplay(listOfNotes.map(content => {
        if(content.title || content.note) {
          return (
            <DisplayCard key={listOfNotes.indexOf(content)} index={listOfNotes.indexOf(content)}
              title={!content.title ? content.note.slice(0, 40).trim() : content.title.slice(0, 40).trim()}
              note={!content.title ? "" : content.note.slice(0, 40).trim()}
              time={moment(new Date(content.date)).calendar()}
            />
          )
        }
      }))
    })();
  },[ [route.params?.note]])

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
            <TouchableOpacity 
            style={styles.searchBarCont}
            activeOpacity={0.6}
            onPress={() => navigation.navigate("Search")}
            >
              <Iconify icon="iconamoon:search-thin" size={24} color={Colors['black-1']} style={{opacity : 0.7}} />
              <Text style={styles.searchBarText}>Search notes</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginTop : 22, paddingHorizontal : 13}}
            contentInsetAdjustmentBehavior="automatic"
            >
              {notesToDisplay}
          </ScrollView>
          <Btn
              onPress={() => navigation.navigate('EditView', {noteIndex : "new"})}
              text={<Iconify icon="lucide:plus" size={40} color={Colors['white-1']} />}
              style={styles.NewNoteBtn}
              elevation={1}
          />
      </View>
    </SafeAreaView> 
  );
}

const styles = ScaledSheet.create({
  searchBarCont : {
    flexDirection : 'row',
    height : "36@vs",
    width : "100%",
    backgroundColor : Colors.cream,
    borderRadius : 100,
    marginTop : 18,
    paddingHorizontal : 13,
    paddingVertical : "8.5@vs",
  },
  searchBarText : {
    color : Colors['black-1'],
    fontSize : 16,
    opacity : 0.7,
    fontFamily : "Inter-Variable",
    fontWeight : '100',
    marginLeft : 9
  },
  NewNoteBtn : {
    height : "43@vs",
    width : "43@vs",
    backgroundColor : Colors['cream'],
    borderRadius : 100,
    position : "absolute",
    left : "43%",
    bottom : 20,
    justifyContent : "center",
    alignItems : "center",
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
})

export default Home;
