import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {AppNavigation} from "./src/navigation/AppNavigation";
import {Provider} from "react-redux";
import store from "./src/store";
import { bootstrap } from './src/bootstrap';
import {useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import {THEME} from "./src/theme";

export default function App() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const loadResources = async () => {
            try {
                await bootstrap();
            } catch (e) {
                console.error('Error loading resources:', e);
            } finally {
                setIsReady(true);
                await SplashScreen.hideAsync();
            }
        };

        loadResources();
    }, []);

    if (!isReady) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={THEME.MAIN_COLOR} />
            </View>
        );
    }
    return (
        <Provider store={store}>
            <AppNavigation/>
        </Provider>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
