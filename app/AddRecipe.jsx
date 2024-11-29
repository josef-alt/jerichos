import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native'
import { React, useState } from 'react'
import { getAll, insert } from './data/db'
import ListInputElement from '../components/ListInputElement';

export default function AddRecipe() {
    const [recipe, setRecipe] = useState({
        ingredients: [],
        steps: []
    });

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

            <ListInputElement
                list={recipe.ingredients}
                setList={
                    (updatedList) => {
                        setRecipe({...recipe, ingredients: updatedList});
                    }
                }
                placeholder='New Ingredient'
                title='Add Ingredients'
            />

            <ListInputElement
                list={recipe.steps}
                setList={
                    (updatedList) => {
                        setRecipe({...recipe, steps: updatedList});
                    }
                }
                placeholder='Next Step'
                title='Create Instructions'
            />

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