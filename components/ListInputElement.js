import { useState } from 'react';
import { Text, TextInput, Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../app/styles';

// title should be displayed at the top of the element
// placeholder should be the 'hint' inside the text box
export default function ListInputElement({ title, placeholder, list, setList }) {
    // maintaining user-added elements
    const [newItem, setItem] = useState('');

    function addItem() {
        if(newItem.length > 0) {
            setList([...list, newItem.trim()]);
            setItem('');
        }
    }

    return (
        <View style={styles.elementContainer}>
            <Text style={styles.inputLabel}>{title}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newItem}
                    placeholder={placeholder}
                    backgroundColor={colors.babyBlue}
                    placeholderTextColor={colors.blueGrey}
                    onChangeText={setItem}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={addItem}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            
            <View>
                {list.map((item, index) => (
                    <Text style={styles.listElement} key={index}>
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
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputLabel: {
        color: colors.babyBlue
    },
    input: {
        flexBasis: 0,
        flexGrow: 1,
        paddingHorizontal: 10,
        height: 40,
        borderRadius: 3
    },
    buttonContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.blueGrey,
        borderRadius: 3
    },
    buttonText: {
        fontSize: 20,
        color: colors.babyBlue
    },
    elementContainer: {
        marginBottom: 20
    },
    listElement: {
        color: colors.babyBlue
    }
});
