import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const AIScreen = ({}) => {
    return (
        <View style={styles.screenStyle}>
            <Text style={styles.componentText}>Скоро здесь будет ИИ доктор Dexter</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    componentText: {
        fontFamily: 'open-regular',
        fontSize: 17
    }
})