import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const NewDocumentCardScreen = ({}) => {
    return (
        <View style={styles.screenStyle}>
            <Text>Add new document</Text>
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