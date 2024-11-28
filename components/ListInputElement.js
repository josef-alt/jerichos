import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

// title should be displayed at the top of the element
// placeholder should be the 'hint' inside the text box
export default function ListInputElement(title, placeholder) {
    // maintaining user-added elements
    const [newItem, setItem] = useState('');
    const [list, setList] = useState([]);

    function addItem() {
        setList([...list, newItem]);
        setItem('');
    }

    return (
        <View style={styles.inputContainer}>
            <Text>{title}</Text>
            <View style={styles.listContainer}>
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
    listContainer: {
        marginBottom: 20
    }
});