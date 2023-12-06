import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList, Button, TouchableOpacity, ActivityIndicator} from 'react-native';
import {MedicalDocument} from "../components/MedicalDocument";
import {Feather, Ionicons} from "@expo/vector-icons";
import {THEME} from "../theme";
import {useDispatch, useSelector} from "react-redux";
import {useMedicalDocumentsHook} from "../hooks/useMedicalDocumentsHook";


export const DocumentsListScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const {documents, loading, error} = useSelector(state => state.medicalDocuments)
    const {fetchData} = useMedicalDocumentsHook();


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData()
        });

        return unsubscribe;
    }, [navigation]);

    // Сортировка документов по дате
    const sortedDocuments = [...documents].sort((a, b) => {
        return new Date(a.documentDate) - new Date(b.documentDate);
    });


    const openDocumentHandler = (document) => {
        navigation.navigate('DocumentCard', {document})
    }

    const newDocumentHandler = () => {
        navigation.navigate('NewDocumentCard')
    }

    return (
        <View style={styles.screenStyle}>
            {loading ? (
                <ActivityIndicator size="large" color={THEME.MAIN_COLOR}/>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text>Вам необходимо авторизоваться</Text>
                </View>
            ) : (
                <View style={styles.flatListWrapper}>
                    <FlatList
                        data={sortedDocuments}
                        renderItem={({item}) => <MedicalDocument
                            document={item}
                            onPress={() => openDocumentHandler(item)}/>}
                    />
                </View>

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
    flatListWrapper: {
        flex: 1
    },
    errorContainer: {
        alignItems: 'center'
    },
    errorText: {
        color: 'red'
    }
})