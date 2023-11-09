import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import {MedicalDocument} from "../components/MedicalDocument";
import {DATA} from '../data'


export const DocumentsListScreen = ({navigation}) => {

    const openDocumentHandler = (document) => {
        navigation.navigate('DocumentCard', {document})
    }

    return (
        <View style={styles.screenStyle}>
            <FlatList
                data={DATA}
                renderItem={({item}) => <MedicalDocument document={item} onPress={() => openDocumentHandler(item)}/> }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        padding: 10,
        flex: 1,
    }
})