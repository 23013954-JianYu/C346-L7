import React, {useState} from 'react';
import {datasource} from "./Data";
import {StyleSheet, Alert, TextInput, View, Text, Button} from 'react-native';
import RNPickerSelect from "react-native-picker-select";

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
    label2:{
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex:1,
        margin:10,
    },
});

const Edit = ({navigation, route}) => {
    const [name,setName] = useState(route.params.name);
    const [price,setPrice] = useState(route.params.price.toString());
    const [type, setType] = useState(route.params.type);
    return(
        <View style={styles.Parent}>
            <Text style={styles.title}>Edit item</Text>
            <View>
                <Text style={styles.label}>name:</Text>
                <TextInput style={styles.input} value={name} onChangeText={(text) => setName(text)} />
                <Text style={styles.label2}>price:</Text>
                <TextInput style={styles.input} value={price} onChangeText={(text) => setPrice(text)} />
            </View>
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
            <View style={styles.buttonGroup}>
                <View style={styles.button}>
                    <Button title="Save"
                            onPress={() => {
                                datasource[route.params.index].name=name;
                                datasource[route.params.index].price=Number(price);
                                datasource[route.params.index].type=type;
                                navigation.navigate("Home");
                            }}
                    />
                </View>
                <View style={styles.button}>
                    <Button title="Delete"
                            onPress={()=>{
                                Alert.alert("Are you sure?",'',
                                    [{text:'Yes', onPress:() => {
                                            datasource.splice(route.params.index,1);
                                            navigation.navigate("Home")
                                        }},
                                        {text:'No'}])
                            }}
                    />
                </View>
            </View>
        </View>
    )
}

export default Edit;
