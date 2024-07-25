import { Text, TouchableOpacity, Animated, View,} from "react-native"
import { ScaledSheet } from 'react-native-size-matters';
import Colors from "../../color.config";
import { useNavigation } from "@react-navigation/native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Iconify } from "react-native-iconify";
import { useRef, useState } from "react";


const DisplayCard = ({title, note, time, index, onswipe, data}) => {
    const swipe = useRef(null);
    const indicator = useRef(null);
    const navigation = useNavigation();
    const [offw, setOffw] = useState("20%")
    const [swipeCount, setSwipeCount] = useState(0)

    const renderLeftActions = () => {
        return (
          <TouchableOpacity ref={indicator} onPress={() => {
            swipe.current.close()
            setOffw("20%")
          }} style={[styles.card, styles.leftAction, {width : offw}]}>
            <Iconify icon="mingcute:delete-fill" size={30} color={Colors["white-1"]} />
          </TouchableOpacity>
        );
      };

    const wheninitOpens = (dir) => {
        setSwipeCount(swipeCount + 1)
        setTimeout(() => {
            setOffw("100%")
        }, 200)
        if(swipeCount === 0) {
            
        } else if(swipeCount === 1) {
            setSwipeCount(0)
            onswipe()
        }
    }

    return (
        <>
        <Swipeable overshootLeft={false}
            onSwipeableWillOpen={(dir) => wheninitOpens(dir)} ref={swipe} renderLeftActions={() => renderLeftActions()}>
            <TouchableOpacity 
                style={styles.card}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("EditView", {noteIndex : index, data})}
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
        </Swipeable>
        </>
    )
}

export const DisplayCardStatic = ({title, note, time, index, data}) => {
    const navigation = useNavigation();
    return (
        <>
        <TouchableOpacity 
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("EditView", {noteIndex : index, data})}
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
        height : "auto",
        minHeight : "60@vs",
        width : "100%",
        backgroundColor : Colors.cream,
        borderRadius : 5,
        marginTop : 11,
        paddingVertical : 6,
        paddingHorizontal : 14,
        justifyContent : "space-between"
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
        marginTop : 6,
    },
    leftAction : {
        backgroundColor : "red",
        color : Colors["white-1"],
        flexDirection : "row",
        justifyContent : "flex-start",
        alignItems : "center",
        borderTopRightRadius : 0,
        borderBottomRightRadius : 0,
    }
})

export default DisplayCard;