import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {setToken} from "../../store/actions/authActions";
import {useDispatch, useSelector} from "react-redux";

export const AuthProfileScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async () => {
        // Убедимся, что поля не пустые
        if (username && password) {
            try {
                // Отправляем POST-запрос на сервер
                const response = await fetch('http://192.168.107.174:8080/api/profile/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                });

                // Проверяем успешность запроса
                if (response.ok) {
                    // Получаем токен из ответа
                    const data = await response.json();
                    const token = data.token;

                    navigation.navigate('MainProfileScreen');
                    console.log(token)
                    dispatch(setToken(token));

                } else {
                    // Обработка ошибки, например, неверный логин/пароль
                    alert('Неверный логин или пароль');
                }
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
            }
        } else {
            // Поля не заполнены - отобразим сообщение об ошибке
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
