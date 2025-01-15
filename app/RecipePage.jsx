import { useLocalSearchParams } from 'expo-router/build/hooks';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRecipe } from './data/db';

export default function RecipePage() {
    const { item } = useLocalSearchParams();
    let recipe = JSON.parse(item);
    recipe = getRecipe(recipe.recipeId);

    return (
        // photos? editing? folders?
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Text style={styles.heading}>{recipe.recipeName}</Text>
                    <Text style={styles.subheading}>{recipe.categoryName}</Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.bodyContainer}>
                    <View>
                        <Text style={styles.bodyHeading}>ingredients</Text>{
                        recipe.ingredients.map((ing, idx) => (
                            <Text key={idx}>{ing.name}</Text>
                        ))}
                    </View>

                    <View>
                        <Text style={styles.bodyHeading}>instructions</Text>{
                        recipe.steps.map((step, idx) => (
                            <Text key={idx}>{step.description}</Text>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#C3E0E5',
        height: '100%'
    },
    headerContainer: { },
    heading: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 700,
        color: '#274472'
    },
    subheading: {
        fontSize: 30,
        textAlign: 'center',
        color: '#5885AF'
    },
    separator: {
        height: 1,
        backgroundColor: 'black',
        marginHorizontal: 10,
        marginVertical: 0
    },
    bodyContainer: {
        padding: 10
    },
    bodyHeading: {
        fontSize: 30,
        fontWeight: 500,
        color: '#41729F'
    }
});
