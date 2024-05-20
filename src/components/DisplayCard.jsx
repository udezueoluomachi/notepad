import { View, Text } from "react-native"
import { ScaledSheet } from 'react-native-size-matters';
import Colors from "../../color.config";

const DisplayCard = (props) => {
    return (
        <View style={styles.card}></View>
    )
}

const styles = ScaledSheet.create({
    card : {
        height : "72@vs",
        width : "100%",
        backgroundColor : Colors.cream,
        borderRadius : 5,
        marginTop : 11
    }
})

export default DisplayCard;