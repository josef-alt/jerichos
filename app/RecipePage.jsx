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
                            <View key={idx} style={styles.listElement}>
                                <Text style={styles.listNumber}>{idx + 1}. </Text>
                                <Text style={styles.listContent}>{ing.name}</Text>
                            </View>
                        ))}
                    </View>

                    <View>
                        <Text style={styles.bodyHeading}>instructions</Text>{
                        recipe.steps.map((step, idx) => (
                            <View key={idx} style={styles.listElement}>
                                <Text style={styles.listNumber}>{step.step_number}. </Text>
                                <Text style={styles.listContent}>{step.description}</Text>
                            </View>
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
        fontWeight: '300',
        fontStyle: 'italic',
        color: '#274472',
        opacity: 0.6,
        letterSpacing: 2,
        transform: [{ scaleY: 0.75 }]
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
    },
    listElement: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listNumber: {
        fontFamily: 'monospace',
        width: '12.5%',
        textAlign: 'right',
        color: '#5885AF'
    },
    listContent: {
        marginRight: '10%',
        color: '#5885AF'
    }
});
