import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity, Button, FlatList, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {datasource} from "./Data.js";

const styles = StyleSheet.create({
    data:{
        borderWidth:1,
        alignItems: 'center'
    },
    button: {
        padding:10
    },
    parent:{
        marginTop:40
    },
});

const Home = ({navigation}) => {
    const renderItem = ({item, index}) => {
        return(
            <TouchableOpacity
                onPress={()=>
                {
                    navigation.navigate('Edit',{index:index, type:item.type, name:item.name, price:item.price});
                }}
            >
                <View style={styles.data}>
                    <Text >{item.name} - {item.type} - ${item.price}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.parent}>
            <View>
                <FlatList
                    data={datasource}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()} // Add unique key
                    style={{padding:10}}
                    />
            </View>
            <View>
                <View style={styles.button}><Button title='New income/expense' onPress={()=>{navigation.navigate("Add")}}/></View>
                <View style={styles.button}><Button
                    title='Total income/expense'
                    onPress={() => {
                        // Calculate total income and expenses
                        let totalIncome = 0;
                        let totalExpense = 0;

                        datasource.forEach((item) => {
                            if (item.type === 'Income') {
                                totalIncome += item.price; // Accumulate income
                            } else if (item.type === 'Expense') {
                                totalExpense += item.price; // Accumulate expenses
                            }
                        });

                        // Calculate surplus or deficit
                        const balance = totalIncome - totalExpense;
                        let message;
                        if (balance >= 0) {
                            message = `You have a Surplus of $${balance}`;
                        } else {
                            message = `You have a Deficit of $${Math.abs(balance)}`;
                        }

                        // Show the result in an alert
                        Alert.alert(
                            '',
                            ` Total Income: $${totalIncome.toFixed(1)} \n Total Expense: $${totalExpense.toFixed(1)} \n ${message}`,
                            [{ text: 'OK' }]
                        );
                    }}
                /></View>
            </View>
        </View>
    );
};

export default Home;
