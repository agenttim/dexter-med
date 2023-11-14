import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";

export const DateSelection = ({onSelectedDate}) => {
    const [date, setDate] = useState(new Date());
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
        <View>
            <Text>
                Дата документа: {date.toLocaleDateString(
                'ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                }
            ).toLocaleString()}
            </Text>

            <View style={styles.button}>
                <Button onPress={showDatepicker} title="Изменить дату"/>
            </View>

            {show && (<DateTimePicker value={date} onChange={onChange}/>)}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 15
    }
})