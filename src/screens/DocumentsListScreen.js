import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList, Button, TouchableOpacity, ActivityIndicator} from 'react-native';
import {MedicalDocument} from "../components/MedicalDocument";
import {Feather, Ionicons} from "@expo/vector-icons";
import {THEME} from "../theme";


export const DocumentsListScreen = ({navigation}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Fetch data when the screen comes into focus
            fetchData();
        });

        // Clean up the listener when the component unmounts
        return unsubscribe;
    }, [navigation]);

    const fetchData = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
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
            {(data.length > 0) ? (
                <FlatList
                    data={data}
                    renderItem={({item}) => <MedicalDocument document={item}
                                                             onPress={() => openDocumentHandler(item)}/>}
                />
            ) : (
                <ActivityIndicator size="large" color={THEME.MAIN_COLOR}/>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.roundButton}
                    onPress={newDocumentHandler}
                >
                    <Feather name="plus" size={25} color="white"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        padding: 10,
        flex: 1,
        justifyContent: "center"
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