import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Clipboard
} from 'react-native';
import Colors from '../../color.config';
import {useNavigation } from '@react-navigation/native';
import { ScaledSheet, ms } from 'react-native-size-matters'
import {setItem, getItem} from "../functions/encrypted-storage"
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { Wave } from 'react-native-animated-spinkit';

export default function CreateAccount() {
  const [seedPhrase, setSeedPhrase] = useState(<Wave size={ms(40)} style={{alignSelf : 'center', marginTOp : 8}} color={Colors.cream} />)
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(null)
  
  const navigation = useNavigation()
  useEffect(() => {
    (async() => {
      const user = await getItem("user")
      if(user) {
        navigation.replace("Home")
      }
    })()
  }, [])

  const createAccount = async () =>{
    try {
      if(value) {
        setLoading(<Wave size={ms(14)} style={{alignSelf : 'center',}} color={Colors['white-1']} />)
        let response = await axios.post("https://cloud-notepad-server.onrender.com/user/create-account", {seedPhrase : value.trim().split(" ")})
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
        await setItem("notes", notes.data.message.notes)
        setLoading(null)
      }
    }
    catch(error) {
      setLoading(null)
      console.log(error)
      Toast.show({
        type: 'error',
        text1: 'Opps',
        text2: 'Something went wrong while creating account. Contact developer'
      })
    }
  }

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get("https://cloud-notepad-server.onrender.com/user/new-seedphrase")
        if(!response)
            return Toast.show({
              type: 'error',
              text1: 'No internet connection',
              text2: 'Please connect to internet and reopen the app.'
          })
        setValue(response.data.seedPhrase)
        setSeedPhrase(
          <TouchableOpacity activeOpacity={0.6} onPress={() => {
            Clipboard.setString(response.data.seedPhrase)
            Toast.show({
              type : "info",
              text1 : "Seed phrase copied!",
              text2 : "🙌"
            })
            }}>
            <Text style={{
              color : Colors['black-1'],
              fontFamily : "Inter-Variable",
              marginTop : ms(10),
              fontSize : ms(16),
              fontWeight : "300",
              backgroundColor : Colors['white-3'],
              padding : 5,
              borderRadius : 3
            }}>
              {response.data.seedPhrase}
            </Text>
          </TouchableOpacity>)
      }
      catch(error) {
        console.log(error)
        Toast.show({
          type: 'error',
          text1: 'Opps',
          text2: 'Something went wrong. Contact developer'
      })
      }
    })()
  }, [])

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
              Store your seed phrase in a secure location
            </Text>
          {seedPhrase}
          <View style={styles.nav}>
            <TouchableOpacity onPress={() => {
              createAccount()
              }} style={{width : "100%", height : ms(40), backgroundColor : Colors.cream, justifyContent : "center", borderRadius : 20}}>
              <Text style={{textAlign : "center", color : Colors['white-1']}}>Create account {loading}</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{width : "100%", height : ms(40), justifyContent : "center"}}>
              <Text style={{textAlign : "center"}}>Login instead</Text></TouchableOpacity>
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