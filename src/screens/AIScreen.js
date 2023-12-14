import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const AIScreen = ({}) => {
    return (
        <View style={styles.screenStyle}>
            <Text>AI Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})