import { useLocalSearchParams } from 'expo-router/build/hooks';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRecipe } from './data/db';

export default function RecipePage() {
    const { item } = useLocalSearchParams();
    let recipe = JSON.parse(item);
    recipe = getRecipe(recipe.recipeId);

    return (
        // photos? editing? folders?
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Text>{recipe.recipeName}</Text>
                <Text>{recipe.categoryName}</Text>
            </View>

            <View style={styles.bodyContainer}>
                <View style={styles.ingredientsList}>
                    <Text>ingredients</Text>{
                    recipe.ingredients.map((ing, idx) => (
                        <Text>{ing.name}</Text>
                    ))}
                </View>
                <View style={styles.stepsList}>
                    <Text>instructions</Text>{
                    recipe.steps.map((step, idx) => (
                        <Text>{step.description}</Text>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
});
