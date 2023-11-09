import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {THEME} from "../theme";

export const MedicalDocument = ({document}) => {
    return (
        <View style={styles.componentStyle}>
            <Text>{document.description}</Text>
            <Text>
                {new Date(document.date)
                    .toLocaleDateString('ru', {separator: '.'})}
            </Text>
        </View>
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
        elevation: 2
    }
})