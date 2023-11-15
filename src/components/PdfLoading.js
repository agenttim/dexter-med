import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Pdf from "react-native-pdf";
import RNFS from 'react-native-fs';
import {check, PERMISSIONS, request, RESULTS} from "react-native-permissions";
import {THEME} from "../theme";


export const PdfLoading = () => {
    const [pdfUri, setPdfUri] = useState(null);

    const checkAndRequestPermissions = async () => {
        const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

        if (result === RESULTS.GRANTED) {
            console.log('Permission granted');
        } else {
            const permissionResult = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            if (permissionResult === RESULTS.GRANTED) {
                console.log('Permission granted');
            } else {
                console.log('Permission denied');
            }
        }
    };

    useEffect(() => {
        checkAndRequestPermissions()
    }, []);

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });

            if (Array.isArray(result) && result.length > 0) {
                const firstDocument = result[0];

                // Создайте путь к директории внутри приложения (например, кэш)
                const appDir = RNFS.CachesDirectoryPath;
                const newPath = `${appDir}/selected.pdf`;

                // Скопируйте файл внутрь вашего приложения
                await RNFS.copyFile(firstDocument.uri, newPath);

                setPdfUri(newPath);
            } else {
                console.log('Invalid document result:', result);
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // Пользователь отменил выбор
            } else {
                throw err;
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text>Загрузка ПДФ</Text>
            <View style={styles.button}>
                <Button
                    title="Выбрать PDF"
                    onPress={pickDocument}
                />
            </View>
            {pdfUri && (
                <View style={styles.pdfWrapper}>
                    <Pdf
                        source={{uri: pdfUri, cache: true}}
                        style={styles.pdf}
                    />
                </View>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //borderWidth: 1,
        marginBottom: 10
    },
    pdf: {
        flex: 1,
    },
    pdfWrapper: {
        //alignItems: "flex-start",
        //justifyContent: "flex-start",
        flex: 1,
        width: '100%',
        borderWidth: 1,
        borderColor: THEME.INACTIVE_COLOR,
        marginVertical: 20,
        marginLeft: 0
    },
    button: {
        width: '100%', // Растягивается на всю доступную ширину
        marginTop: 10, // Добавлен верхний отступ
    }
});
