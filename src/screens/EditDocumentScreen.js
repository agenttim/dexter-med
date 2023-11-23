import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, SafeAreaView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {THEME} from "../theme";
import {DateSelection} from "../components/DateSelection";
import {PdfLoading} from "../components/PdfLoading";
import {useMedicalDocumentsHook} from "../hooks/useMedicalDocumentsHook";


export const EditDocumentCardScreen = ({navigation, route}) => {
    const {document} = route.params
    const { editDocument } = useMedicalDocumentsHook()

    const [title, setTitle] = useState(document.title);
    const [description, setDescription] = useState(document.description);
    const [date, setDate] = useState(new Date(document.date));

    const updateDocument = async () => {
        const updatedDocumentData = {
            title,
            description,
            date: date.toJSON()
        };

        try {
            await editDocument(document.id, updatedDocumentData);
            navigation.navigate('DocumentsList');
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

            <DateSelection onSelectedDate={setDate} initialDate={date} />

            <Button title="Изменить документ" onPress={updateDocument} color={THEME.MAIN_COLOR}/>

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