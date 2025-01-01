import { TextInput, StyleSheet, Button, Alert, ScrollView } from 'react-native'
import { React, useState } from 'react'
import ListInputElement from '../components/ListInputElement';
import { insert } from './data/db';

export default function AddRecipe() {
    const [recipe, setRecipe] = useState({
        ingredients: [],
        steps: []
    });

    return (
        <ScrollView style={{marginHorizontal: 5, marginBottom:5}}>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setRecipe({...recipe, name: text.trim()})}
                value={recipe.name}
                placeholder='Recipe Name'
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => setRecipe({...recipe, category: text.trim()})}
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

            <Button
                title="Create"
                onPress={
                    () => {
                        Alert.alert(`New Recipe ${recipe.name}`);
                        insert(recipe);
                    }
                }
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      marginBottom: 42,
      borderWidth: 1,
      padding: 10
    }
  });