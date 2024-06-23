import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  RefreshControl
} from 'react-native';
import Colors from '../../color.config';
import {useNavigation } from '@react-navigation/native';
import { ScaledSheet } from 'react-native-size-matters'
import {Btn} from "../components/Buttons"
import DisplayCard from '../components/DisplayCard';
import { Iconify } from 'react-native-iconify';
import {setItem, getItem} from "../functions/encrypted-storage"
import moment from 'moment';
import axios from 'axios';
import Toast from 'react-native-toast-message';

function Home({route}) {
  const listOfNotes = []
  const [modalVisible, setModalVisibility] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [notesToDisplay, setNotesToDisplay] = useState(<Text style={{
    textAlign : "center",
    color : Colors['black-1'],
    fontFamily : "Inter-Variable",
    fontSize : 14
  }}>Your notes would appear here. Click the "+" button to create a new note</Text>)
  const [itemIndex, setIndex] = useState(0);
  const deleteNote = async (index) => {
    const notes = JSON.parse(await getItem("notes")).reverse()
    const newNotes = notes.filter((note, i) => i !== index )
    await setItem("notes", JSON.stringify(newNotes.reverse()))
  }

  async function handleSignin () {
    try {
      navigation.navigate("Login")
    }
    catch(error) {
      Alert.alert("Error signing.", error)
    }
  }

  async function reflectUserData() {
    try {
      const user = await getItem("user")
      const notes = await getItem("notes")
      const response = await axios.post("https://q20j8xdt-2000.uks1.devtunnels.ms/user/syncnotes", {
        notes : JSON.parse(notes)
      }, {headers : {
        Authorization : `Bearer ${user}`
      }})
      await setItem("notes", JSON.stringify(response.data.message.reverse()))
    }
    catch(error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: 'Opps',
        text2: 'Something went wrong with login. Contact developer'
      })
    }
  }

  const navigation = useNavigation()
  useEffect( () => {
    (async () => {
      const notes = await getItem("notes")
      if(!notes) {
        await setItem("notes", JSON.stringify([{
          id : "hfyfefygfiijdj",
          date : new Date().toString(),
          title : "Welcome to Notes",
          note : `Welcome! Capture anything with Notes on.

Create a note by tapping "+" in the bottom-right corner of the homepage.

Feel free to tell us your comments or suggestions.

Longpress a note to delete it.`
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
              onLongPress={() => {
                setIndex(listOfNotes.indexOf(content));
                setModalVisibility(true)
              }}
            />
          )
        }
      }))
    })();
  },[ [route.params?.note]])

  return (
    <SafeAreaView>
      
      <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      >
          <View style={{backgroundColor : `${Colors["black-1"]}33`, width : "100%", height : "100%"}}>
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <Text style={styles.modalText}>Delete Note ?</Text>
                      <View style={{flexDirection : "row", width : "auto"}}>
                          <TouchableOpacity
                          style={[styles.button, styles.buttonOpen, {marginHorizontal : 10}]}
                          onPress={() => {
                            deleteNote(itemIndex)
                            setModalVisibility(false)
                          }} activeOpacity={0.7}>
                              <Text style={styles.textStyle}>Delete</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                          style={[styles.button, styles.buttonClose, {marginHorizontal : 10}]}
                          onPress={() => setModalVisibility(false)} activeOpacity={0.7}>
                              <Text style={styles.textStyle}>Cancel</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
          </View>
      </Modal>
      <View
        style={{backgroundColor : Colors['white-1'], height : "100%", paddingTop : 22}}
        >
          <View style={{paddingHorizontal : 13}}>
            <View style={styles.header}>
              <Text style={{
                color : Colors['black-1'],
                fontSize : 40,
                fontFamily : "Inter-Variable",
                fontWeight : "650"
              }}>Notes</Text>
              <TouchableOpacity
              style={styles.connectAccount}
              onPress={() => handleSignin()}
               activeOpacity={0.6}>
                <Iconify icon='fa-regular:user' size={25} color={Colors['white-3']} />
              </TouchableOpacity>
            </View>
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
            contentInsetAdjustmentBehavior="automatic"  refreshControl={
              <RefreshControl refreshing={refreshing}
              colors={["#000000"]}
              progressBackgroundColor="#ffffff" onRefresh={() => {
                  setRefreshing(true)
                  reflectUserData()
                  .then(() => {
                      setRefreshing(false)
                  })
              }} />
              }
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    margin: "20@ms",
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 35,
    width : "300@ms",
    height : "100@vs",
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: "4@ms",
    padding: 10,
  },
  buttonOpen: {
    backgroundColor: '#FF0088',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily : "Inter-Variable"
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
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
  },
  header : {
    flexDirection : "row",
    justifyContent : "space-between",
    alignItems : "center"
  },
  connectAccount : {
    borderRadius : 100,
    borderColor : Colors['white-3'],
    borderStyle : "solid",
    borderWidth : 2,
    width : 40,
    height : 40,
    justifyContent : "center",
    alignItems : "center"
  }
})

export default Home;
