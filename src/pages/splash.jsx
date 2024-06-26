import { useEffect } from "react";
import {
    View,
    Image
} from "react-native";
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../color.config';
import {setItem, getItem} from "../functions/encrypted-storage"
import {useNavigation } from '@react-navigation/native';


export default function Splash() {
    const navigation = useNavigation();
    useEffect(() => {
        (async() => {
          const user = await getItem("user")
          const timeOut = setTimeout(() => {
            if(user) {
              navigation.replace("Home")
            }
            else {
              navigation.replace("CreateAccount")
            }
          }, 2700)
        })()
    }, [])
    return (
        <View style={[
            {
                width : "100%",
                height : "100%",
                justifyContent : "center",
                alignItems : "center",
                backgroundColor : Colors["white-1"]
            }
        ]}>
            <Image style={{
                height : moderateScale(72),
                width : moderateScale(72)
            }} source={require("../images/favicon.png")}/>
        </View>
    )
}