import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, BackHandler, Pressable, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import Database from '../components/Database'

const RideDetails = (props) => {

    const [color, setColor] = useState('papayawhip')
    const [item, setItem] = useState({})

    const getObject = () => {
        Database.getChosen(props.route.params.item.id).then((result) => {
            setItem(JSON.parse(result).rows._array[0])
        })
    }


    useEffect(() => {

        getObject()


        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                props.navigation.navigate('Rides')
                return true
            }
        );

        return () => backHandler.remove();
    }, [])

    // const item = props.route.params
    return (<View style={{
        flex: 1, backgroundColor: '#fffbf0'
    }}>
        <View style={{ height: 45, backgroundColor: 'papayawhip' }}></View>
        <View style={{ overflow: 'hidden', paddingBottom: 5 }}>

            <View style={{
                height: 55, backgroundColor: 'papayawhip', flexDirection: 'row', justifyContent: 'space-between', shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,

            }}>
                <View style={{ flexDirection: 'row', }}>
                    <Pressable style={{ backgroundColor: color, width: 55, height: 55, borderRadius: 30, marginLeft: 3 }} onPressIn={() => {
                        setColor('#aa9a80')
                    }} onPress={() => {
                        props.navigation.navigate('Rides')
                    }}
                        onPressOut={() => {
                            setColor('papayawhip')
                        }}>
                        <Image
                            source={require('../img/back.png')}
                            style={{ alignSelf: 'center', marginTop: 15 }}
                        />
                    </Pressable>
                    <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>RideDetails</Text>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <TouchableOpacity
                        onPress={() => Alert.alert(
                            "Removing ride",
                            "Are you sure you want to remove this item?",
                            [
                                {
                                    text: "Cancel",
                                },
                                {
                                    text: "YES", onPress: () => {
                                        Database.remove(props.route.params.item.id)
                                        props.navigation.navigate('Rides')
                                        props.route.params.fun()
                                        const showToastWithGravity = () => {
                                            ToastAndroid.showWithGravity(
                                                "Successfully removed",
                                                ToastAndroid.SHORT,
                                                ToastAndroid.CENTER
                                            );
                                        };
                                        showToastWithGravity()
                                    }
                                }
                            ],
                            { cancelable: false }
                        )}
                    >
                        <Image
                            source={require('../img/trash.png')}
                            style={{ height: 30, width: 30, marginRight: 20 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('EditRide', { item: item, fun: () => getObject() })}
                    >
                        <Image
                            source={require('../img/edit.png')}
                            style={{ height: 30, width: 30, marginRight: 20 }}
                        />

                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <View style={styles.container}>
            <View style={styles.side}>
                <View style={styles.item}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={require('../img/date.png')}
                    />
                    <Text style={styles.text}>{item.date}</Text>
                </View>
                <View style={styles.item}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={require('../img/usage.png')}
                    />
                    <Text style={styles.text}>{item.usage} l/100km</Text>
                </View>
                <View style={styles.item}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={require('../img/target.png')}
                    />
                    <Text style={styles.text}>{item.target}</Text>
                </View>
                <View style={styles.item}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={require('../img/cash.png')}
                    />
                    <Text style={styles.text}>{(Number(item.usage) / 100 * Number(item.kilometers) * Number(item.fuelprice)).toFixed(2)}zł</Text>
                </View>
            </View>

            <View style={styles.side}>

                <View style={styles.item}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={require('../img/kilometers.png')}
                    />
                    <Text style={styles.text}>{item.kilometers}km</Text>
                </View>

                <View style={styles.item}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={require('../img/car.png')}
                    />
                    <Text style={styles.text}>{item.car}</Text>
                </View>

                <View style={styles.item}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={require('../img/price.png')}
                    />
                    <Text style={styles.text}>{item.fuelprice}zł</Text>
                </View>
            </View>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 20,
    },
    side: {
        width: Dimensions.get('window').width / 2,
    },
    item: {
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10
    },
    text: {
        fontSize: 35,
        color: '#aa9a80',
        textAlign: 'center'
    }
})

export default RideDetails