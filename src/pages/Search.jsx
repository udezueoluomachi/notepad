import { View, ScrollView, TextInput, TouchableOpacity, Text } from "react-native";
import { useState, useEffect } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../color.config";
import { Iconify } from "react-native-iconify";
import DisplayCard from "../components/DisplayCard";
import search from "../functions/search";
import { getItem } from "../functions/encrypted-storage";
import moment from "moment";

const Search = () => {
    const navigation = useNavigation();
    const [mysearch, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState(<Text style={{textAlign : "center", color : Colors.ash}}>
        Your search results would appear here.
    </Text>)

    useEffect( () => {
        (async () => {
          const notes = await getItem("notes")
          if(!notes) return navigation.goBack();

          const data = JSON.parse(notes)

          if(mysearch && mysearch.toLowerCase != "") {
            const results = search(data, mysearch)
            if(results.length > 0) {
                setSearchResults(
                    results.map(content => {
                        if((content.title || content.note) && content.deleted != true) {
                          return (
                            <DisplayCard key={data.reverse().indexOf(content)} index={data.reverse().indexOf(content)}
                              title={!content.title ? content.note.slice(0, 40).trim() : content.title.slice(0, 40).trim()}
                              note={!content.title ? "" : content.note.slice(0, 40).trim()}
                              time={moment(new Date(content.date)).calendar()}
                            />
                          )
                        }
                      })
                )
            }
            else {
                setSearchResults(<Text style={{textAlign : "center", color : Colors.ash}}>
                    Your search results would appear here.
                </Text>)
            }
          }
          else {
              setSearchResults(<Text style={{textAlign : "center", color : Colors.ash}}>
                  Your search results would appear here.
              </Text>)
          }
        })();
      },[mysearch])

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} >
                    <Iconify icon="material-symbols:arrow-back-ios" size={26} color={Colors["black-1"]} />
                </TouchableOpacity>
                <View style={styles.searchBarCont} >
                    <Iconify icon="iconamoon:search-thin" size={24} color={Colors['black-1']} style={{opacity : 0.7}} />
                    <TextInput style={styles.searchBarText} placeholder="Search notes" autoFocus={true} onChangeText={(text) => setSearch(text)} />
                </View>
            </View>
            <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginTop : 22, paddingHorizontal : 13, height : "100%"}}
            contentInsetAdjustmentBehavior="automatic">
                {searchResults}
            </ScrollView>
        </View>
    )
}


const styles = ScaledSheet.create({
    screen : {
        width : "100%",
        height : "100%",
        backgroundColor : Colors["white-1"]
    },
    header : {
        flexDirection : "row",
        alignItems : "center",
        paddingHorizontal : 13,
        paddingVertical : 2,
    },
    backButton : {
        width: "auto"
    },
    searchBarCont : {
        flexDirection : 'row',
        alignItems : "center",
        height : "36@vs",
        width : "100%",
        backgroundColor : Colors.cream,
        borderRadius : 100,
        paddingHorizontal : 13,
        flex : 1
    },
    searchBarText : {
        color : Colors['black-1'],
        fontSize : 16,
        opacity : 0.7,
        fontFamily : "Inter-Variable",
        fontWeight : '100',
        marginLeft : 9,
        height: "40@vs",
        width: "100%"
    },
})

export default Search;