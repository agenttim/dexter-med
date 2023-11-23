import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {THEME} from "../theme";
import {DateSelection} from "../components/DateSelection";
import {useMedicalDocumentsHook} from "../hooks/useMedicalDocumentsHook";


export const EditDocumentCardScreen = ({navigation, route}) => {
    const {document} = route.params
    const {editDocument} = useMedicalDocumentsHook()

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
            <Text style={{fontFamily: 'open-regular', fontSize: 15, color: THEME.MAIN_COLOR}}>Изменить существующий документ</Text>

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

            <TouchableOpacity
                style={styles.button}
                onPress={updateDocument}
            >
                <Text style={styles.buttonText}>Изменить документ</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: THEME.INACTIVE_COLOR
    },
    button: {
        marginTop: 15,
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
})