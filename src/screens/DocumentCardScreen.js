import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const DocumentCardScreen = ({route}) => {
    const {document} = route.params;

    return (
        <View style={styles.screenStyle}>
            <Text>
                {document.file}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
