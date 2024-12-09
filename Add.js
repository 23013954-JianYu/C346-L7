import React, {useState} from 'react';
import {datasource} from "./Data";
import {StyleSheet, TextInput, View, Text, Button} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
    Parent: {
        flex: 1,
        padding: 20,
        marginTop:30,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    label2: {
        fontSize: 16,
        marginTop: 15,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    input2: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    RNP: {
        padding:10,
        marginBottom:20,
        borderWidth: 1,
        marginTop:5
    },

});

const Add = ({navigation}) => {
    const [name,setName] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('Income');
    return(
        <View style={styles.Parent}>
            <Text style={styles.title}>Add Income/Expense</Text>
            <View>
                <Text style={styles.label}>Name:</Text>
                <TextInput style={styles.input} onChangeText={(text) => setName(text)} />
                <Text style={styles.label}>Price:</Text>
                <TextInput style={styles.input2} onChangeText={(text) => setPrice(text)} />
            </View>
            <Text style={styles.label2}>Type:</Text>
            <View style={styles.RNP}>
                <RNPickerSelect
                    value={type}
                    style={styles.picker}
                    onValueChange={(value) => setType(value)}
                    items={[
                        {label: 'Income', value: 'Income'},
                        {label: 'Expense', value: 'Expense'}
                    ]}
                />
            </View>
            <Button title="SUBMIT"
                    onPress={() => {
                        let item = {name: name, type: type, price: Number(price),};
                        datasource.push(item);
                        navigation.navigate("Home");
                    }
                    }
            />
        </View>
    )
}

export default Add;
