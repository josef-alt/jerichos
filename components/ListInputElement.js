import { useState } from 'react';
import { Text, TextInput, Button, View, StyleSheet } from 'react-native';

// title should be displayed at the top of the element
// placeholder should be the 'hint' inside the text box
export default function ListInputElement({ title, placeholder, list, setList }) {
    // maintaining user-added elements
    const [newItem, setItem] = useState('');

    function addItem() {
        setList([...list, newItem.trim()]);
        setItem('');
    }

    return (
        <View style={styles.elementContainer}>
            <Text>{title}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={{
                        borderWidth: 1,
                        flexGrow: 1
                    }}
                    value={newItem}
                    placeholder={placeholder}
                    onChangeText={setItem}
                />
                <Button
                    title="+" onPress={addItem}
                />
            </View>
            <View>
                {list.map((item, index) => (
                    <Text key={index}>
                        {item}
                    </Text>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between'        
    },
    elementContainer: {
        marginBottom: 20
    }
});
