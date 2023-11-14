import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, SafeAreaView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


export const NewDocumentCardScreen = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');



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

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View style={styles.container}>
            <Text>Add New Document</Text>

            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />

            <SafeAreaView>
                <Button onPress={showDatepicker} title="Show date picker!" />
                <Button onPress={showTimepicker} title="Show time picker!" />
                <Text>selected: {date.toLocaleString()}</Text>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
            </SafeAreaView>

            <Button title="Add" onPress={addDocument}/>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});