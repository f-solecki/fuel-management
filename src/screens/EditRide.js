import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, BackHandler, ScrollView } from 'react-native'
import Database from '../components/Database'

const EditRide = (props) => {

    const [date, setDate] = useState(props.route.params.item.date)
    const [kilometers, setKilometers] = useState(props.route.params.item.kilometers.toString())
    const [usage, setUsage] = useState(props.route.params.item.usage)
    const [car, setCar] = useState(props.route.params.item.car)
    const [target, setTarget] = useState(props.route.params.item.target)
    const [fuelprice, setFuelprice] = useState(props.route.params.item.fuelprice)


    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                props.navigation.navigate('Rides')
                return true
            }
        );

        return () => backHandler.remove();
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: '#fffbf0' }}>
            <ScrollView style={{
                flexDirection: 'column'
            }}>

                <View style={styles.item}>
                    <Text style={styles.header}>Data: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setDate(text)}
                        value={date}
                    />
                </View>
                <View style={styles.item}>
                    <Text style={styles.header}>Kilometry: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setKilometers(text)}
                        value={kilometers}
                    />
                </View>
                <View style={styles.item}>
                    <Text style={styles.header}>Zużycie: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setUsage(text)}
                        value={usage}
                    />
                </View>
                <View style={styles.item}>
                    <Text style={styles.header}>Auto: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setCar(text)}
                        value={car}
                    />
                </View>
                <View style={styles.item}>
                    <Text style={styles.header}>Cel podróży: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setTarget(text)}
                        value={target}
                    />
                </View>
                <View style={styles.item}>
                    <Text style={styles.header}>Cena paliwa: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setFuelprice(text)}
                        value={fuelprice}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.down} onPress={() => {
                Database.update(Number(props.route.params.item.id), date, Number(kilometers), usage, car, target, fuelprice)
                props.navigation.goBack()
                props.route.params.fun()
                setDate('')
                setCar('')
                setFuelprice('')
                setKilometers('')
                setTarget('')
                setUsage('')
            }} ><Text style={{ fontSize: 20, letterSpacing: 2, fontWeight: 'bold' }}>Save changes</Text>
            </TouchableOpacity>
        </View>)
}

const styles = StyleSheet.create({
    header: {
        fontSize: 40,
        color: '#998970',
        marginLeft: '5%'
    },
    down: {
        justifyContent: "center",
        alignItems: "center",
        bottom: 0,
        backgroundColor: '#ffdca2',
        height: 40
    },
    item: {
        flexDirection: 'column',
        marginTop: 10
    },
    input: {
        height: 40,
        borderColor: '#ffdca2',
        borderWidth: 2,
        fontSize: 30,
        width: '90%',
        marginLeft: '5%',
        borderRadius: 10,
        paddingLeft: 10, marginBottom: 5
    }
})

export default EditRide