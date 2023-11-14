import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, SafeAreaView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {THEME} from "../theme";


export const NewDocumentCardScreen = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);


    const addDocument = async () => {

        const document = {
            title,
            description,
            date: date.toJSON()
        }

        try {
            const response = await fetch('https://dexter-med-default-rtdb.europe-west1.firebasedatabase.app/medical-documents.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(document)
            })

            if (response.ok) {
                alert('Медицинский документ успешно добавлен!');
                setTitle('');
                setDescription('');
            }

        } catch (error) {
            console.log(error);
        }

    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    }

    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <View style={styles.container}>
            <Text>Добавить новый документ</Text>

            <TextInput
                placeholder="Название"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                placeholder="Описание"
                value={description}
                onChangeText={setDescription}
            />

            <Text>
                Дата документа: {date.toLocaleDateString(
                'ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                }
            ).toLocaleString()}
            </Text>
            <View style={styles.button}>
                <Button onPress={showDatepicker} title="Выбрать дату"/>
            </View>
            {show && (
                <DateTimePicker
                    value={date}
                    onChange={onChange}
                />
            )}

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
    }
})