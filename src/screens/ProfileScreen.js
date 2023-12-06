import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export const ProfileScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Здесь ты можешь реализовать проверку логина и пароля
        // Например, отправить запрос на сервер для аутентификации

        // Пока просто проверим, что поля не пустые
        if (username && password) {
            // Если данные верны, можешь перейти на основной экран
            navigation.navigate('Main');
        } else {
            // Иначе можешь обработать ошибку или отобразить сообщение об ошибке
            alert('Введите корректный логин и пароль');
        }
    };

    return (
        <View style={styles.screenStyle}>
            <Text>Login Screen</Text>
            <TextInput
                style={styles.input}
                placeholder="Логин"
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry
                onChangeText={text => setPassword(text)}
            />
            <Button title="Войти" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 10,
        width: '80%',
    },
});
