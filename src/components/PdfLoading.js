import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {firebase} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firebaseConfig from '../firebaseConfig';
import {THEME} from "../theme";
import {Feather} from "@expo/vector-icons";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const PdfLoading = ({onPdfUrl}) => {
    const [pdfUri, setPdfUri] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const checkAndRequestPermissions = async () => {
        const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

        if (result === RESULTS.GRANTED) {
            console.log('Разрешение предоставлено');
        } else {
            const permissionResult = await request(
                PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
            );
            if (permissionResult === RESULTS.GRANTED) {
                console.log('Разрешение предоставлено');
            } else {
                console.log('Разрешение отклонено');
            }
        }
    };

    useEffect(() => {
        checkAndRequestPermissions();
    }, []);

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });

            if (Array.isArray(result) && result.length > 0) {
                const firstDocument = result[0];

                // Создайте путь к каталогу внутри приложения (например, кэш)
                const appDir = RNFS.CachesDirectoryPath;
                const newPath = `${appDir}/selected.pdf`;

                // Копируйте файл внутрь вашего приложения
                await RNFS.copyFile(firstDocument.uri, newPath);

                // Установите локальный URI для предварительного просмотра PDF
                setPdfUri(newPath);

                // Загрузите файл в Firebase Storage
                await uploadFileToFirebaseStorage(newPath);
            } else {
                console.log('Недопустимый результат выбора документа:', result);
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // Пользователь отменил выбор
            } else {
                throw err;
            }
        }
    };

    const uploadFileToFirebaseStorage = async (localFilePath) => {
        // Ссылка на корзину Firebase Storage
        const storageRef = storage().ref('gs://dexter-med.appspot.com');

        try {
            // Получите данные файла в формате base64
            const fileData = await RNFS.readFile(localFilePath, 'base64');

            // Создайте уникальное имя для файла в Firebase Storage
            const fileName = `${Date.now()}_${Math.floor(
                Math.random() * 100000
            )}.pdf`;

            // Создайте ссылку на файл в Firebase Storage
            const fileRef = storageRef.child(fileName);

            // Загрузите файл в Firebase Storage
            const uploadTask = fileRef.putString(fileData, 'base64');

            // Слушайте изменения состояния, ошибки и завершение загрузки
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error('Ошибка загрузки файла:', error);
                },
                () => {
                    console.log('Файл успешно загружен');
                    // Получите URL для загруженного файла
                    fileRef.getDownloadURL().then((downloadURL) => {
                        console.log('Файл доступен по адресу:', downloadURL);
                        onPdfUrl(downloadURL)
                    });
                }
            );
        } catch (error) {
            console.error('Ошибка чтения файла:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{fontFamily: 'open-regular', fontSize: 15, marginBottom: 5}}>Выберите pdf файл для
                загрузки</Text>
            <View style={styles.buttonEditContainer}>
                <TouchableOpacity style={styles.roundButton} onPress={pickDocument}>
                    <Feather name="edit" size={25} color="white"/>
                </TouchableOpacity>
            </View>
            {(pdfUri && uploadProgress === 0) && (
                <ActivityIndicator size="large" color="#0000ff"/>
            )}
            {uploadProgress > 0 && (
                <View style={styles.pdfWrapper}>
                    <Pdf source={{uri: pdfUri, cache: true}} style={styles.pdf}/>
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
        marginBottom: 10,
    },
    pdf: {
        flex: 1,
    },
    pdfWrapper: {
        flex: 1,
        width: '100%',
        borderWidth: 1,
        borderColor: THEME.INACTIVE_COLOR,
        marginVertical: 20,
    },
    roundButton: {
        borderRadius: 25,
        width: 50,
        height: 50,
        backgroundColor: THEME.MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    }
});