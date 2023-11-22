import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import Pdf from "react-native-pdf";
import {useDispatch} from "react-redux";
import {resetTabScreenDocumentsOptions, setTabScreenDocumentsOptions} from "../store/actions/navigationAction";
import {Feather} from "@expo/vector-icons";
import {THEME} from "../theme";

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

    function deleteDocumentHandler() {

    }

    function editDocumentHandler() {

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
            <View style={styles.buttonEditContainer}>
                <TouchableOpacity style={styles.roundEditButton} onPress={editDocumentHandler}>
                    <Feather name="edit" size={25} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonDeleteContainer}>
                <TouchableOpacity style={styles.roundDeleteButton} onPress={deleteDocumentHandler}>
                    <Feather name="trash-2" size={25} color="white" />
                </TouchableOpacity>
            </View>
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
    },
    roundDeleteButton: {
        borderRadius: 25,
        width: 50,
        height: 50,
        backgroundColor: THEME.DANGER_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    roundEditButton: {
        borderRadius: 25,
        width: 50,
        height: 50,
        backgroundColor: THEME.MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonDeleteContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    buttonEditContainer: {
        position: 'absolute',
        bottom: 100,
        right: 20
    },
});
