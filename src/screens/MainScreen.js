import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export const MainScreen = ({}) => {
    return (
        <View style={styles.screenStyle}>
            <Image style={styles.imageStyle} source={require('../../assets/Dexter-Medical.png')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    imageStyle: {
        width: '100%',
        height: 400,
        marginTop: 50
    }
})