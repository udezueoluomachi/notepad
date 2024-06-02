import { useState } from "react";
import { View, Text, TouchableOpacity,} from "react-native"
import { ScaledSheet } from 'react-native-size-matters';
import Colors from "../../color.config";
import { useNavigation } from "@react-navigation/native";
import { getItem, setItem } from "../functions/encrypted-storage";

const DisplayCard = ({title, note, time, index, onLongPress}) => {
    const navigation = useNavigation();

    return (
        <>
            <TouchableOpacity 
                style={styles.card}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("EditView", {noteIndex : index})}
                onLongPress={onLongPress}
            >
            <Text style={styles.title}>
                {title}
            </Text>
            <Text style={styles.content}>
                {note}
            </Text>
            <Text style={styles.time}>
                {time}
            </Text>
            </TouchableOpacity>
        </>
    )
}

const styles = ScaledSheet.create({
    card : {
        height : "72@vs",
        width : "100%",
        backgroundColor : Colors.cream,
        borderRadius : 5,
        marginTop : 11,
        paddingVertical : 6,
        paddingHorizontal : 14
    },
    title : {
        fontFamily : "Inter-Variable",
        fontSize : "16@ms",
        fontWeight : "bold",
        color : Colors["black-1"]
    },
    content : {
        fontFamily : "Inter-Variable",
        fontSize : "14@ms",
        fontWeight : "medium",
        color : Colors["black-1"],
        opacity : 0.7,
        marginTop : 2
    },
    time : {
        fontFamily : "Inter-Variable",
        fontSize : "12@ms",
        fontWeight : "light",
        color : Colors["black-1"],
        opacity : 0.5,
        marginTop : 6
    }
})

export default DisplayCard;