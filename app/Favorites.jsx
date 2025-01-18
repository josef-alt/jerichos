import { StyleSheet, FlatList, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { getFavorites } from './data/db'
import RecipeCard from '../components/RecipeCard';
import { useFocusEffect } from '@react-navigation/native';

export default function Favorites() {
    // track whether or not database is ready
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            try {
                const data = getFavorites();
                setFavorites(data);
                setLoading(false);
            } catch(err) {
                console.log('error', err);
            }
        }, [])
    );

    if(loading) {
        return (
            <SafeAreaView style={styles.mainContainer}>
                <Text>Loading...</Text>
                <StatusBar style="auto" />
            </SafeAreaView>
        );
    }

    if(favorites === undefined || favorites.length == 0) {
        return (
            <SafeAreaView style={styles.mainContainer}>
                <Text>You need to add some favorites first!</Text>
                <StatusBar style="auto" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <FlatList
                contentContainerStyle={{gap:5}}
                data={favorites}
                keyExtractor={(item) => item.recipeName}
                renderItem={ ({item}) => <RecipeCard item={item} /> }
            />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#C3E0E5',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
});
