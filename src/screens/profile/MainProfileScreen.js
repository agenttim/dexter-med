import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from "react-redux";

export const MainProfileScreen = ({}) => {
    const {token} = useSelector((state) => state.auth);

    return (
        <View style={styles.container}>
            <Text>Main Profile Screen</Text>
            <Text>{token}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    }
})