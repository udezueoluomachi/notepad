import { View, Text, TouchableOpacity } from "react-native"
import { ScaledSheet } from 'react-native-size-matters';
import Colors from "../../color.config";

const DisplayCard = (props) => {
    return (
        <TouchableOpacity 
            style={styles.card}
            activeOpacity={0.7}
        >
        <Text style={styles.title}>
            Welcome to Notes
        </Text>
        <Text style={styles.content}>
            Welcome! Capture anything with Notes on
        </Text>
        <Text style={styles.time}>
            Welcome! Capture anything with Notes on
        </Text>
        </TouchableOpacity>
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
        opacity : 0.7,
        marginTop : 6
    }
})

export default DisplayCard;