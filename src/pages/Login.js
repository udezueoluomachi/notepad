import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Colors from '../../color.config';
import {useNavigation } from '@react-navigation/native';
import { ScaledSheet, ms } from 'react-native-size-matters'
import {setItem, getItem} from "../functions/encrypted-storage"
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { Wave } from 'react-native-animated-spinkit';

export default function Login() {
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(null)
  
  const navigation = useNavigation()

  const login = async () =>{
    try {
      if(value) {
        setLoading(<Wave size={ms(14)} style={{alignSelf : 'center',}} color={Colors['white-1']} />)
        let response = await axios.post("https://cloud-notepad-server.onrender.com/user/login", {seedPhrase : value.trim().split(" ")})
        if(!response)
            return Toast.show({
              type: 'error',
              text1: 'No internet connection',
              text2: 'Please connect to internet and reopen the app.'
          })
        await setItem("user", response.data.message.accessToken)
        const notes = await axios.get("https://cloud-notepad-server.onrender.com/user/notes", {headers : {
          Authorization : `Bearer ${response.data.message.accessToken}`
        }})
        await setItem("notes", JSON.stringify(notes.data.message.notes.reverse()))
        setLoading(null)
        navigation.replace("Home")
      }
    }
    catch(error) {
        setLoading(null)
      console.log(error)
      Toast.show({
        type: 'error',
        text1: 'Opps',
        text2: 'Something went wrong with login. Contact developer'
      })
    }
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.view}>
        <View style={styles.seedPhrase}>
            <Text style={{
              color : Colors['black-1'],
              fontFamily : "Inter-Variable",
              fontSize : ms(40),
              fontWeight : "bold"
            }}>
              Login to your account
            </Text>
          <View style={styles.nav}>
            <TextInput  
            style={{width : "100%", height : ms(50),
            borderColor : Colors.cream, borderWidth : 2, borderStyle : "solid",
            justifyContent : "center", borderRadius : 3, marginBottom : ms(40), paddingHorizontal : 5, color : Colors['black-1']}}
            placeholder='Seed phrase' onChangeText={text => setValue(text)} placeholderTextColor={Colors['ash']} />
            <TouchableOpacity onPress={() => {
              login()
              }} style={{width : "100%", height : ms(40), backgroundColor : Colors.cream, justifyContent : "center", borderRadius : 20}}>
              <Text style={{textAlign : "center", color : Colors['white-1']}}>Login {loading}</Text></TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = ScaledSheet.create({
  view : {
    height : "100%",
    width : "100%",
    backgroundColor : Colors['white-1'],
    padding : "13@ms",
  },
  seedPhrase : {
    marginTop : "100@vs"
  },
  nav : {
    marginTop : "120@vs"
  }
})