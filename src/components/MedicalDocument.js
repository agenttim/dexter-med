import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import {THEME} from "../theme";

export const MedicalDocument = ({document, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.componentStyle}
            onPress={onPress}
        >
            <Text>{document.description}</Text>
            <Text>
                {new Date(document.date)
                    .toLocaleDateString('ru', {separator: '.'})}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    componentStyle: {
        marginBottom: 10,
        marginHorizontal: 2,
        marginTop: 2,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        elevation: 3,
        backfaceVisibility: "visible"
    }
})