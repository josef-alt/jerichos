import { View, Text } from 'react-native'
import React from 'react'
import { getAll, insert } from './data/db'

export default function AddRecipe() {

    // test database insertion
    insert("value 1");
    insert("value 2");
    getAll();

  return (
    <View>
        <Text>add new</Text>
    </View>
  )
}
