import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {MainScreen} from "../screens/MainScreen";
import {DocumentsListScreen} from "../screens/DocumentsListScreen";
import {ProfileScreen} from "../screens/ProfileScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Feather} from '@expo/vector-icons';
import {THEME} from "../theme";
import {LaboratoryTestsScreen} from "../screens/LaboratoryTestsScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {DocumentCardScreen} from "../screens/DocumentCardScreen";
import {NewDocumentCardScreen} from "../screens/NewDocumentCardScreen";


const Tab = createBottomTabNavigator();
const Documents = createNativeStackNavigator();


export const AppNavigation = ({}) => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: THEME.MAIN_COLOR,
                    tabBarInactiveTintColor: THEME.INACTIVE_COLOR,
                    tabBarLabelStyle: {
                        fontSize: 13
                    },
                    tabBarStyle: {
                        height: 70,
                        paddingTop: 10,
                        paddingBottom: 10
                    },
                    headerStyle: {
                        borderBottomWidth: 1,
                    },
                    headerTintColor: THEME.MAIN_COLOR
                }}
            >
                <Tab.Screen
                    name="Main"
                    component={MainScreen}
                    options={{
                        tabBarLabel: "Главная",
                        headerShown: false,
                        tabBarIcon: ({color}) => (
                            <Feather name="home" size={25} color={color}/>
                        )
                    }}
                />
                <Tab.Screen
                    name="LaboratoryTests"
                    component={LaboratoryTestsScreen}
                    options={{
                        tabBarLabel: "Анализы",
                        headerTitle: "Ваши лабораторные анализы",
                        tabBarIcon: ({color}) => (
                            <Feather name="droplet" size={25} color={color}/>
                        )
                    }}
                />
                <Tab.Screen
                    name="Documents"
                    component={DocumentsNavigator}
                    options={{
                        tabBarLabel: "Медкарта",
                        headerTitle: "Ваши медицинские документы",
                        tabBarIcon: ({color}) => (
                            <Feather name="book" size={25} color={color}/>
                        )
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "Профиль",
                        headerTitle: "Настройки профиля",
                        tabBarIcon: ({color}) => (
                            <Feather name="user" size={25} color={color}/>
                        )
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function DocumentsNavigator() {
    return (
        <Documents.Navigator>
            <Documents.Screen
                name="DocumentsList"
                component={DocumentsListScreen}
                options={{headerShown: false}}
            />
            <Documents.Screen
                name="DocumentCard"
                component={DocumentCardScreen}
                options={{headerShown: false}}
            />
            <Documents.Screen
                name="NewDocumentCard"
                component={NewDocumentCardScreen}
                options={{headerShown: false}}
            />
        </Documents.Navigator>
    )
}
