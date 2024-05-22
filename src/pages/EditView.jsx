import {useRef, useState, useEffect} from 'react';
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
import {setItem, getItem, removeItem} from "../functions/encrypted-storage"


function EditView({route}) {
  const navigation = useNavigation();

  const [title, setTitle] = useState("")
  const [note, setNote] = useState("")
  const [time, setTime] = useState(new Date().toString())

  const {noteIndex} = route.params;

  useEffect(() => {
    (async () => {
      const notes = JSON.parse(await getItem("notes")).reverse();
      if(noteIndex != "new") {
        const content = notes[noteIndex]
        setTime(content.time)
        setTitle(content.title)
        setNote(content.note)
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
      <TextInput placeholder='Title' style={{...styles.title, ...styles.input}}
        value={title} onChangeText={text => setTitle(text.trim())} />
      <TextInput placeholder='Note something down.' style={{...styles.note, ...styles.input}}
        value={note} onChangeText={text => setNote(text.trim())} />
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
