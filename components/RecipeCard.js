import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function RecipeCard(item) {
    item = item.item;

    return (
        <View style={styles.recipeContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.recipeHeader} numberOfLines={1}>{item.recipeName}</Text>
                <TouchableOpacity style={styles.heartButton}>
                    <FontAwesome name={item.isFavorite ? 'heart' : 'heart-o'} size={24} color={'red'}/>
                </TouchableOpacity>
            </View>
            <Text style={styles.recipeBody}>
                {item.categoryName.toUpperCase()}
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
        backgroundColor: 'lightgrey',
        shadowColor: '#000',
        shadowOffset: { 
            width: 0,
            height: 2 
        },
        shadowOpacity: 0.8,
        shadowRadius: 2
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    recipeHeader: {
        fontSize: 30,
        fontWeight: '500',
        flex: 1,
        marginRight: 10
    },
    heartButton: {
        padding: 5
    },
    recipeBody: {
        fontSize: 14,
        color: 'gray',
    }
});
