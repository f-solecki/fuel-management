import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Database from "../components/Database";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        Database.createTable();
        window.setInterval(() => {
            this.changeNavigate()
        }, 2000)
    }
    changeNavigate = () => {
        this.props.navigation.navigate("Rides")
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 60, textAlign: "center", color: 'white' }}>Fuel Organizer</Text>
                    <Button title="Start" onPress={this.changeNavigate} />

                </View>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        backgroundColor: "#513BFA",
        justifyContent: "center",
        flex: 1,
        alignItems: "center",

    }

})


export default Main;

