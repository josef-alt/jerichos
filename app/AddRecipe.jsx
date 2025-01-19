import { TextInput, StyleSheet, Button, Alert, ScrollView } from 'react-native'
import { React, useState } from 'react'
import ListInputElement from '../components/ListInputElement';
import { insert } from './data/db';
import { colors } from './styles';

export default function AddRecipe() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [recipe, setRecipe] = useState({
        ingredients: [],
        steps: []
    });

    return (
        <ScrollView style={styles.mainContainer}>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setName(text)}
                value={name}
                placeholder='Recipe Name'
                placeholderTextColor={colors.blueGrey}
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => setCategory(text)}
                value={category}
                placeholder='Category'
                placeholderTextColor={colors.blueGrey}
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
                        if(name.length == 0) {
                            Alert.alert('Please enter a recipe title.');
                        } else {
                            recipe.name = name.trim();
                            recipe.category = category.trim();
                            Alert.alert(`New Recipe ${recipe.name}`);
                            insert(recipe);
                        }
                    }
                }
                color={colors.blueGrey}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 5,
        backgroundColor: colors.darkBlue
    },
    input: {
        height: 40,
        marginBottom: 42,
        borderWidth: 1,
        padding: 10,
        backgroundColor: colors.babyBlue
    }
});
