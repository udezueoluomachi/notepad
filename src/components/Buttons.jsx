import {
    Text,
    Linking,
    TouchableOpacity
} from "react-native";

export const Btn = props => {
    return (
        <TouchableOpacity style={props.style} activeOpacity={0.9} onPress={props.onPress}>
            <Text style={props.textStyle}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}

export const Anchor = props => {
    return (
        <TouchableOpacity style={props.style} onPress={() => Linking.openURL(props.href)}>
            <Text style={props.textStyle}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}