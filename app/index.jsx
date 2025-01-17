import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipeCard from '../components/RecipeCard';
import { getAll } from './data/db';
import React, { useState } from 'react';
import { Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from './styles';

export default function Home() {
    // track whether or not database is ready
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            try {
                const data = getAll();
                setRecipes(data);
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

    return (
        <SafeAreaView style={styles.mainContainer}>
            <FlatList
                contentContainerStyle={{gap:5}}
                data={recipes}
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
        backgroundColor: colors.darkBlue,
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
});
