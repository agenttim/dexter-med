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
            <Text style={{marginHorizontal: 10}}>
                {date.toLocaleDateString(
                    'ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    }
                ).toLocaleString()}
            </Text>

            <TouchableOpacity style={styles.roundEditButton} onPress={showDatepicker}>
                <Feather name="edit" size={25} color="white"/>
            </TouchableOpacity>

            {show && (<DateTimePicker value={date} onChange={onChange}/>)}
        </View>
    )
}

const styles = StyleSheet.create({
    dateWrapper: {
        borderWidth: 1,
        borderColor: THEME.INACTIVE_COLOR,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5
    },
    roundEditButton: {
        borderRadius: 25,
        width: 50,
        height: 50,
        backgroundColor: THEME.MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 5
    }
})