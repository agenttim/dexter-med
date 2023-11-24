import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import {THEME} from "../theme";
import {Feather} from "@expo/vector-icons";

export const DateSelection = ({onSelectedDate, initialDate}) => {
    const [date, setDate] = useState(new Date(initialDate));
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        setShow(false)
        setDate(selectedDate)
        onSelectedDate(selectedDate)
    }

    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <View style={styles.dateWrapper}>
            <TouchableOpacity onPress={showDatepicker} style={{flex: 1, alignItems: 'center'}}>
                <Text style={{marginVertical: 10, fontFamily: 'open-regular', fontSize: 16}}>
                    {date.toLocaleDateString(
                        'ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        }
                    ).toLocaleString()}
                </Text>
            </TouchableOpacity>
            {show && (<DateTimePicker value={date} onChange={onChange}/>)}
        </View>
    )
}

const styles = StyleSheet.create({
    dateWrapper: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: THEME.MAIN_COLOR,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
        borderRadius: 25,
        width: '75%'
    }
})