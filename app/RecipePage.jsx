import { useLocalSearchParams } from 'expo-router/build/hooks';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RecipePage() {
    const { item } = useLocalSearchParams();
    const recipe = JSON.parse(item);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Text>{recipe.recipeName}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
});
