import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput, Button } from 'react-native'
import Database from '../components/Database'

const AddRide = (props) => {

    const today = new Date()
    const now = today.getDate() + '.' + today.getMonth() + '.' + today.getFullYear()
    const [date, setDate] = useState(now)
    const [kilometers, setKilometers] = useState('')
    const [usage, setUsage] = useState('')
    const [car, setCar] = useState('')
    const [target, setTarget] = useState('')
    const [fuelprice, setFuelprice] = useState('')



    return (<View>
        <View>
            <Text style={styles.header}>Data: </Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setDate(text)}
                value={date}
            />
        </View>
        <View>
            <Text style={styles.header}>Kilometry: </Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setKilometers(text)}
                value={kilometers}
            />
        </View>
        <View>
            <Text style={styles.header}>Zużycie: </Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setUsage(text)}
                value={usage}
            />
        </View>
        <View>
            <Text style={styles.header}>Auto: </Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setCar(text)}
                value={car}
            />
        </View>
        <View>
            <Text style={styles.header}>Cel podróży: </Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setTarget(text)}
                value={target}
            />
        </View>
        <View>
            <Text style={styles.header}>Cena paliwa: </Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setFuelprice(text)}
                value={fuelprice}
            />
        </View>
        <Button title='Dodaj' onPress={() => {
            Database.add(date, Number(kilometers), usage, car, target, fuelprice)
            // props.navigation.navigate('Rides')
            setDate('')
            setCar('')
            setFuelprice('')
            setKilometers('')
            setTarget('')
            setUsage('')
        }} />
    </View>)
}

const styles = StyleSheet.create({
    header: {
        fontSize: 40
    }
})

export default AddRide