import { Text, View, StyleSheet } from 'react-native';

export default function RecipeCard(item) {
    item = item.item;

    return (
        <View style={styles.recipeContainer}>
          <Text style={styles.recipeHeader}>{item.name}</Text>
          <Text style={styles.recipeBody}>
            {item.recipeName} | {item.categoryName.toUpperCase()}
          </Text>
        </View>
      )
}

const styles = StyleSheet.create({
    recipeContainer: {
      marginHorizontal: 5,
      padding: 10,
      gap: 2,
      borderRadius: 10,
      backgroundColor: 'lightgrey'
    },
    recipeHeader: {
      fontSize: 20,
      fontWeight: '500'
    },
    recipeBody: {
  
    }
});