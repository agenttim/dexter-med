import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export const MainProfileScreen = ({}) => {
    const { token } = useSelector((state) => state.auth);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Вызываем метод для получения данных пользователя
        fetchUserProfile();
    }, [token]);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch('http://192.168.107.174:8080/api/profile/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                console.error('Ошибка при получении данных пользователя');
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <View style={styles.container}>
            {userData && (
                <View>
                    <Text>Добро пожаловать: {userData.name}!</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});
