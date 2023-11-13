import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList, Button, TouchableOpacity} from 'react-native';
import {MedicalDocument} from "../components/MedicalDocument";
import {DATA} from '../data'
import {Feather, Ionicons} from "@expo/vector-icons";
import {THEME} from "../theme";


export const DocumentsListScreen = ({navigation}) => {

    const openDocumentHandler = (document) => {
        navigation.navigate('DocumentCard', {document})
    }

    return (
        <View style={styles.screenStyle}>
            <FlatList
                data={DATA}
                renderItem={({item}) => <MedicalDocument document={item} onPress={() => openDocumentHandler(item)}/>}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.roundButton}>
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