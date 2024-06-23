import {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../color.config";
import { Iconify } from "react-native-iconify";
import moment from 'moment';
import {setItem, getItem, } from "../functions/encrypted-storage";
import random from 'random-string-generator';


function EditView({route}) {
  const navigation = useNavigation();

  const [title, setTitle] = useState("")
  const [note, setNote] = useState("")
  const [time, setTime] = useState(new Date().toString())

  const {noteIndex} = route.params;

  const saveNote = async () => {
    const notes = JSON.parse(await getItem("notes")).reverse();
    if(/*title.trim() != "" && note.trim() != ""*/ true) {
      //save
      if(noteIndex != "new") {
        notes[noteIndex]. date = time
        notes[noteIndex].title = title
        notes[noteIndex].note = note
        await setItem("notes", JSON.stringify(notes.reverse()))
      }
      else {
        notes.reverse();
        notes[notes.length - 1].date = time,
        notes[notes.length - 1].title = title
        notes[notes.length - 1].note = note
        await setItem("notes", JSON.stringify(notes))
      }
    }
    else {
      //delete note
    }
  }

  useEffect(() => {
    (async () => {
      const notes = JSON.parse(await getItem("notes")).reverse();
      if(noteIndex != "new") {
        const content = notes[noteIndex]
        setTime(content.date)
        setTitle(content.title)
        setNote(content.note)
      }
      else {
        notes.reverse();
        notes.push({
          id : random(),
          date : time,
          title : title,
          note : note
        })
        await setItem("notes", JSON.stringify(notes))
      }
    })();
  },[])

  return (
    <View style={styles.screen} >
      <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} >
              <Iconify icon="material-symbols:arrow-back-ios" size={26} color={Colors["black-1"]} />
          </TouchableOpacity>
          <View>
            <Text style={styles.pageTitle}>Notes</Text>
          </View>
      </View>
      <View
      style={{marginTop : 22, paddingHorizontal : 13}}>
          <Text style={styles.lastUpdated}>{moment(new Date(time)).calendar()}</Text>
      </View>
      <TextInput placeholderTextColor={Colors['ash']} placeholder='Title' style={{...styles.title, ...styles.input}}
        value={title} onChangeText={text => {
          setTitle(text)
          setTime(new Date().toString())
          saveNote()
        }} />
      <TextInput placeholderTextColor={Colors['ash']} placeholder='Note something down.' style={{...styles.note, ...styles.input}} multiline
        value={note} onChangeText={text => {
          setNote(text)
          setTime(new Date().toString())
          saveNote()
          }} />
    </View>
  );
}

const styles = ScaledSheet.create({
  screen : {
    height : "100%",
    width : "100%",
    backgroundColor : Colors['white-1']
  },
  header : {
    flexDirection : "row",
    alignItems : "center",
    paddingHorizontal : 13,
    paddingVertical : 2, 
  },
  pageTitle : {
    color : Colors['black-1'],
    fontSize : 18,
    fontFamily : "Inter-Variable",
    fontWeight : "medium"
  },
  lastUpdated : {
    color : Colors['black-1'],
    opacity : 0.7,
    fontSize : 12,
    fontFamily : "Inter-Variable",
    fontWeight : "light"
  },
  title : {
    color : Colors['black-1'],
    fontSize : 16,
    opacity : 0.7,
    fontFamily : "Inter-Variable",
    fontWeight : 'bold',
    height: "40@vs",
    width: "100%"
  },
  input : {
    paddingHorizontal : 13
  },
  note : {
    color : Colors['black-1'],
    fontSize : 14,
    opacity : 0.7,
    fontFamily : "Inter-Variable",
    fontWeight : 'regular',
    height: "auto",
    width: "100%",
  }
})

export default EditView;
