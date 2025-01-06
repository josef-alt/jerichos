import { Text } from 'react-native'
import React from 'react'
import { getFavorites } from './data/db'

export default function Favorites() {
    // track whether or not database is ready
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const data = getFavorites();
            setFavorites(data);
            setLoading(false);
        } catch(err) {
            console.log('error', err);
        }
    }, []);

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
