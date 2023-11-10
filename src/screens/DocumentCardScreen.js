import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Pdf from "react-native-pdf";

export const DocumentCardScreen = ({route}) => {
    const {document} = route.params;
    const PdfRead = {uri: 'https://getfile.dokpub.com/yandex/get/https://disk.yandex.ru/i/1F5doIa4LoW8JQ', cache: true}

    return (
        <View style={styles.screenStyle}>
            <Pdf
                source={PdfRead}
                style={styles.pdf}
                trustAllCerts={false}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`number of pages: ${numberOfPages}`);
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});
