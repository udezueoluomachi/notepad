import { View, ScrollView, TextInput, TouchableOpacity, Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../color.config";
import { Iconify } from "react-native-iconify";
import DisplayCard from "../components/DisplayCard";

const Search = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} >
                    <Iconify icon="material-symbols:arrow-back-ios" size={26} color={Colors["black-1"]} />
                </TouchableOpacity>
                <View style={styles.searchBarCont} >
                    <Iconify icon="iconamoon:search-thin" size={24} color={Colors['black-1']} style={{opacity : 0.7}} />
                    <TextInput style={styles.searchBarText} placeholder="Search notes" autoFocus={true} />
                </View>
            </View>
            <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginTop : 22, paddingHorizontal : 13, height : "100%"}}
            contentInsetAdjustmentBehavior="automatic">
                <Text style={{textAlign : "center", color : Colors.ash}}>
                    Your search results would appear here.
                </Text>
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