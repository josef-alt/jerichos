import React from 'react'
import { Tabs } from 'expo-router'

export default function Layout () {
  return (
    <Tabs>
        <Tabs.Screen
            name="AddRecipe"
            options={{
                title: "New"
            }}
        />
        <Tabs.Screen
            name="index"
            options={{
                title: "Home"
            }}
        />
        <Tabs.Screen
            name="Favorites"
            options={{
                title: "Faves"
            }}
        />
    </Tabs>
  )
}
