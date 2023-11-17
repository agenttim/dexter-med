import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList, Button, TouchableOpacity} from 'react-native';
import {MedicalDocument} from "../components/MedicalDocument";
import {Feather, Ionicons} from "@expo/vector-icons";
import {THEME} from "../theme";


export const DocumentsListScreen = ({navigation}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();
    }, [navigation]);

    const fetchData = async () => {
        try {
            const response = await fetch('https://dexter-med-34099-default-rtdb.firebaseio.com/medical-documents.json'); // Replace with your API endpoint
            const result = await response.json();
            const documentsArray = Object.values(result);
            setData(documentsArray);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const openDocumentHandler = (document) => {
        navigation.navigate('DocumentCard', {document})
    }

    const newDocumentHandler = () => {
        navigation.navigate('NewDocumentCard')
    }

    return (
        <View style={styles.screenStyle}>
            <FlatList
                data={data}
                renderItem={({item}) => <MedicalDocument document={item} onPress={() => openDocumentHandler(item)}/>}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.roundButton}
                    onPress={newDocumentHandler}
                >
                    <Feather name="plus" size={25} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        padding: 10,
        flex: 1,
    },
    roundButton: {
        borderRadius: 25,
        width: 50,
        height: 50,
        backgroundColor: THEME.MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20
    },
})