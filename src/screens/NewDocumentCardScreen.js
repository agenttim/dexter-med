import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {THEME} from "../theme";
import {DateSelection} from "../components/DateSelection";
import {PdfLoading} from "../components/PdfLoading";
import {API_URL} from "../globalConfig";
import {useSelector} from "react-redux";


export const NewDocumentCardScreen = ({navigation}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [pdfUrl, setPdfUrl] = useState(null);
    const { token } = useSelector((state) => state.auth);


    const addDocument = async () => {

        const document = {
            documentName: title,
            documentDescription: description,
            documentDate: date.toJSON(),
            file: pdfUrl
        }

        try {
            const response = await fetch(`${API_URL}/medical-documents`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(document)
            })

            if (response.ok) {
                Alert.alert('Добавление нового документа', 'Новый документ успешно добавлен!');
                console.log(document)
                setTitle('');
                setDescription('');
                setPdfUrl('')
            }

            navigation.navigate('DocumentsList')

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{fontFamily: 'open-regular', fontSize: 17, marginBottom: 5}}>Добавить новый документ:</Text>

            <TextInput
                style={styles.input}
                placeholder="Название"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={styles.input}
                placeholder="Описание"
                value={description}
                onChangeText={setDescription}
            />

            <DateSelection onSelectedDate={setDate} initialDate={date}/>

            <PdfLoading onPdfUrl={setPdfUrl}/>

            <TouchableOpacity
                style={styles.button}
                onPress={addDocument}
            >
                <Text style={styles.buttonText}>Добавить новую запись</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    button: {
        marginTop: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: THEME.BUTTON_BACKGROUND,
        borderColor: THEME.MAIN_COLOR,
        borderWidth: 2,
        borderRadius: 10,
    },
    buttonText: {
        color: THEME.MAIN_COLOR,
        textAlign: 'center',
        fontSize: 17,
        fontFamily: 'open-regular',
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: THEME.INACTIVE_COLOR,
        fontFamily: 'open-regular',
        fontSize: 16
    },

})