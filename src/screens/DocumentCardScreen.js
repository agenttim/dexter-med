import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import Pdf from "react-native-pdf";
import {useDispatch} from "react-redux";
import {resetTabScreenDocumentsOptions, setTabScreenDocumentsOptions} from "../store/actions/navigationAction";

export const DocumentCardScreen = ({route}) => {
    const {document} = route.params
    const dispatch = useDispatch();

    useEffect(() => {
        async function loadPdf() {
            try {
                const pdfUrl = document.file;
                const pdfFile = {uri: pdfUrl, cache: true};
                setPdfSource(pdfFile);
                dispatch(setTabScreenDocumentsOptions());
            } catch (error) {
                console.error('Ошибка загрузки PDF:', error);
            }
        }

        loadPdf();

        return () => {
            dispatch(resetTabScreenDocumentsOptions())
        }
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
