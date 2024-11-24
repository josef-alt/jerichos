import React, { useEffect } from 'react'
import { Tabs } from 'expo-router'
import { init } from './data/db';

export default function Layout () {

    // set up database
    useEffect(() => {
        init();
    }, []);

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
