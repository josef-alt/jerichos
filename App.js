import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Platform } from 'react-native';
import recipes from './assets/data/dummy.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipeCard from './components/RecipeCard';

export default function App() {
  return (
      <SafeAreaView style={styles.mainContainer}>
        <FlatList
          contentContainerStyle={{gap:5}}
          data={recipes}
          keyExtractor={(item) => item.name}
          renderItem={ ({item}) => <RecipeCard item={item} /> }
        />      
        <StatusBar style="auto" />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});
