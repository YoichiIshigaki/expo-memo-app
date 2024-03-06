import React from "react";
import { View,Text,StyleSheet,type TextStyle } from "react-native";

type Props = { bang?: boolean, children: React.ReactNode ,style?:TextStyle }

const Hello = (props: Props): JSX.Element => {
    const { children, bang, style } = props
    return (
        <View>
            <Text style={[styles.text,style]} >Hello {children} {bang &&  "!"}</Text>
        </View>
    ) 
}

const styles = StyleSheet.create({
    text: {
        color :"#fff",
        backgroundColor:"blue",
        fontSize:40,
        fontWeight:"bold",
        padding:16
    }
})

export default Hello;