import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {THEME} from "../theme";
import {DateSelection} from "../components/DateSelection";
import {PdfLoading} from "../components/PdfLoading";


export const NewDocumentCardScreen = ({navigation}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [pdfUrl, setPdfUrl] = useState(null);


    const addDocument = async () => {

        const document = {
            title,
            description,
            date: date.toJSON(),
            file: pdfUrl
        }

        try {
            const response = await fetch('https://dexter-med-34099-default-rtdb.firebaseio.com/medical-documents.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
            <Text style={{fontFamily: 'open-regular', fontSize: 15, marginBottom: 5}}>Добавить новый документ:</Text>

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
        backgroundColor: 'transparent',
        borderColor: THEME.MAIN_COLOR,
        borderWidth: 1,
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
    },

})