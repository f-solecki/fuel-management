import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, LogBox, Text, BackHandler, Image, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import Database from "../components/Database";

const Rides = (props) => {

    const [rides, setRides] = useState([])
    const [back, setBack] = useState(false)
    const [display, setDisplay] = useState('none')
    LogBox.ignoreAllLogs();

    useEffect(() => {
        Database.createTable();
        getData();
    }, [])

    useEffect(() => {
        const backAction = () => {
            if (back === true) {
                setDisplay('none')
                BackHandler.exitApp()
                return true
            } else {
                setBack(true)
                setDisplay('flex')
                window.setTimeout(() => { setBack(false); setDisplay('none') }, 3000)
                return true
            };
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => backAction()
        );

        return () => backHandler.remove();
    }, [back])


    const addRide = () => {
        props.navigation.navigate("AddRide", { fun: () => getData() })
    }

    const getData = () => {
        Database.getAll().then((all) => {
            let temp = (JSON.parse(all).rows._array)
            setRides(temp)
        })
    }

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#999', height: 40, justifyContent: 'center', alignItems: 'center', display: display }}><Text style={{ fontSize: 20, color: 'papayawhip' }}>Naciśnij ponownie aby wyjść</Text></View>
            <View style={styles.header}>
                <FlatList
                    data={rides}
                    style={styles.list}
                    renderItem={({ item }) =>
                        <Pressable
                            onPress={() => { props.navigation.push('RideDetails', { item: item, fun: () => getData() }) }}
                            style={styles.oneItem}>
                            <View style={styles.item}>
                                <Image
                                    style={{ width: 50, height: 50 }}
                                    source={require('../img/date.png')}
                                />
                                <Text style={styles.text}>{item.date}</Text>
                            </View>
                            <View style={styles.item}>
                                <Image
                                    style={{ width: 50, height: 50 }}
                                    source={require('../img/kilometers.png')}
                                />
                                <Text style={styles.text}>{item.kilometers}km</Text>
                            </View>
                            <View style={styles.item}>
                                <Image
                                    style={{ width: 50, height: 50 }}
                                    source={require('../img/cash.png')}
                                />
                                <Text style={styles.text}>{(Number(item.usage) / 100 * Number(item.kilometers) * Number(item.fuelprice)).toFixed(2)}zł</Text>
                            </View>
                        </Pressable>
                    }
                    keyExtractor={item => item.id.toString()}
                    key={item => item.id.toString()}
                />
            </View>
            <TouchableOpacity style={styles.down} onPress={() => addRide()}>
                <Text style={{ fontSize: 20, letterSpacing: 2, fontWeight: 'bold' }}>Add another trip</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffbf0'
    },
    header: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        marginLeft: 15
    },
    down: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ffdca2',
        height: 40
    },
    list: {
        width: '100%'
    },

    item: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        color: '#bbab91'
    },
    oneItem: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: Dimensions.get('window').width - 30,
        borderRadius: 15,
        marginTop: 10
    }
})


export default Rides;

