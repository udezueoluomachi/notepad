import React from 'react';
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


function EditView() {
  const navigation = useNavigation();

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
          <Text style={styles.lastUpdated}>{moment(new Date("Tue May 21 2024 11:09:26 GMT+0100")).calendar()}</Text>
      </View>
      <TextInput placeholder='Title' style={{...styles.title, ...styles.inputContainer}} />
      <TextInput placeholder='Note something down.' />
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
    fontWeight : '100',
    height: "40@vs",
    width: "100%"
  },
  inputContainer : {
    paddingHorizontal : 13
  }
})

export default EditView;
