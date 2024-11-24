import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Platform } from 'react-native';
import recipes from '../assets/data/dummy.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipeCard from '../components/RecipeCard';
import { getAll } from './data/db';


export default function Home() {
    // test database retrieval
    getAll();

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
