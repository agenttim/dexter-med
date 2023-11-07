import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {MainScreen} from "../screens/MainScreen";
import {DocumentsScreen} from "../screens/DocumentsScreen";

const Tab = createMaterialBottomTabNavigator();


export const AppNavigation = ({}) => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Main"
                    component={MainScreen}
                    options={{

                    }}/>
                <Tab.Screen name="Documents" component={DocumentsScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}
