import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native'
import { React, useState } from 'react'
import { getAll, insert } from './data/db'

export default function AddRecipe() {
    const [recipe, setRecipe] = useState({
        ingredients: []
    });
    const [ingredient, setIngredient] = useState('');

    function addIngredient() {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ingredient]});
    }

    return (
        <View style={{marginHorizontal: 5}}>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setRecipe({...recipe, name: text})}
                value={recipe.name}
                placeholder='Recipe Name'
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => setRecipe({...recipe, category: text})}
                value={recipe.category}
                placeholder='Category'
            />

            <View style={styles.ingredientsContainer}>
                <Text>Raw Ingredients List</Text>
                <View style={styles.ingredientInput}>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            flexGrow: 1
                        }}
                        value={ingredient}
                        placeholder="Ingredient Name"
                        onChangeText={setIngredient}
                    />
                    <Button
                        title="+" onPress={addIngredient}
                    />
                </View>
                <View>
                    {recipe.ingredients.map((ingr, index) => (
                        <Text key={index}>
                            {ingr}
                        </Text>
                    ))}
                </View>
            </View>

            <Button onPress={() => Alert.alert(`New Recipe ${recipe.name}`)} title="Create" />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      marginBottom: 42,
      borderWidth: 1,
      padding: 10
    },
    ingredientInput: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between'        
    },
    ingredientsContainer: {
        marginBottom: 20
    }
  });