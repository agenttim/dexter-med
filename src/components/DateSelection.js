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
            <TouchableOpacity onPress={showDatepicker}>
                <Text style={{marginHorizontal: 10, marginVertical: 10, fontFamily: 'open-regular', fontSize: 16, color: THEME.MAIN_COLOR}}>
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
        //borderWidth: 1,
        //borderColor: THEME.INACTIVE_COLOR,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5
    }
})