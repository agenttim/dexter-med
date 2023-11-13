import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import Pdf from "react-native-pdf";
import {Asset} from 'expo-asset';

export const DocumentCardScreen = ({route}) => {
    const {document} = route.params

    useEffect(() => {
        async function loadPdf() {

            setTimeout(async () => {
                const asset = Asset.fromModule(document.file);
                await asset.downloadAsync();
                console.log(asset);

                const pdfFile = {uri: asset.localUri, cache: true};

                setPdfSource(pdfFile);
            }, 2000)


        }

        loadPdf();
    }, []);

    const [pdfSource, setPdfSource] = React.useState(null);

    if (!pdfSource) {
        return (
            <View style={styles.screenStyle}>
                <Text>Загрузка...</Text>
            </View>
        )
    }

    return (
        <View style={styles.screenStyle}>
            <Pdf
                source={pdfSource}
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
