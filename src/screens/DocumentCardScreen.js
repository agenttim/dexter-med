import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Print from 'expo-print';
import { Asset } from 'expo-asset';

export const DocumentCardScreen = ({ route }) => {
    const {document} = route.params;

    const openPDF = async () => {
        try {
            const asset = Asset.fromModule(document.file);
            await asset.downloadAsync();
            console.log(asset)

            await Print.printAsync({
                uri: asset.localUri,
            });
        } catch (error) {
            console.log(document.file)
            console.error("Error while opening PDF:", error);
        }
    }

    openPDF()

    return (
        <View style={styles.screenStyle}>
            <Text >{document.description}</Text>
            <Text >{new Date(document.date)
                .toLocaleDateString('ru', {separator: '.'})}</Text>
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
