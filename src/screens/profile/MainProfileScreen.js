import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const MainProfileScreen = ({}) => {
    return (
        <View style={styles.container}>
            <Text>Main Profile Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    }
})