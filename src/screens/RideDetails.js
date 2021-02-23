import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, BackHandler } from 'react-native'

const RideDetails = (props) => {


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

    const item = props.route.params
    console.log(item)
    return (<View style={{
        flex: 1, backgroundColor: '#fffbf0'
    }}>
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
        marginLeft: 5
    },
    side: {
        width: Dimensions.get('window').width / 2,
    },
    item: {
        alignItems: 'center',
    },
    text: {
        fontSize: 35,
        color: '#aa9a80',
        textAlign: 'center'
    }
})

export default RideDetails