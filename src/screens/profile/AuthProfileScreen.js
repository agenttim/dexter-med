import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/actions/authActions';
import { THEME } from '../../theme';

export const AuthProfileScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (username && password) {
            try {
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

                if (response.ok) {
                    const data = await response.json();
                    const token = data.token;

                    navigation.navigate('MainProfileScreen');
                    console.log(token);
                    dispatch(setToken(token));
                } else {
                    alert('Неверный логин или пароль');
                }
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
            }
        } else {
            alert('Введите корректный логин и пароль');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вход в профиль</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Войти</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: 'open-regular',
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        borderColor: THEME.INACTIVE_COLOR,
        borderWidth: 1,
        marginVertical: 5,
        padding: 10,
        width: '100%',
        fontFamily: 'open-regular',
        fontSize: 16
    },
    button: {
        marginTop: 15,
        paddingVertical: 10,
        backgroundColor: THEME.BUTTON_BACKGROUND,
        borderColor: THEME.MAIN_COLOR,
        borderWidth: 2,
        borderRadius: 10,
        width: '100%'
    },
    buttonText: {
        color: THEME.MAIN_COLOR,
        textAlign: 'center',
        fontSize: 17,
        fontFamily: 'open-regular',
    },
});
