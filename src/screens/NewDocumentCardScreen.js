import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, SafeAreaView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {THEME} from "../theme";
import {DateSelection} from "../components/DateSelection";
import {PdfLoading} from "../components/PdfLoading";


export const NewDocumentCardScreen = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [pdfUrl, setPdfUrl] = useState(null);



    const addDocument = async () => {

        const document = {
            title,
            description,
            date: date.toJSON(),
            pdfUrl: pdfUrl
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
                alert('Медицинский документ успешно добавлен!');
                console.log(document)
                setTitle('');
                setDescription('');
                setPdfUrl('')
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Добавить новый документ</Text>

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

            <DateSelection onSelectedDate={setDate}/>

            <PdfLoading onPdfUrl={setPdfUrl}/>

            <Button title="Добавить новую запись" onPress={addDocument} color={THEME.MAIN_COLOR}/>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    button: {
        marginVertical: 15
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: THEME.INACTIVE_COLOR
    },

})