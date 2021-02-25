import React, { Component } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("myfuel.db");

class Database extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    static createTable() {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS car_trips (id integer primary key autoincrement, date text, kilometers integer, usage text,car text, target text,fuelprice text);"
            );
        });
    }

    static add(date, km, usage, car, target, fuelprice) {
        db.transaction(
            tx => {
                tx.executeSql(`INSERT INTO car_trips (date,kilometers,usage,car,target,fuelprice) values ('${date}',${km}, '${usage}','${car}','${target}','${fuelprice}')`);
            })
    }

    static getAll() {
        var query = "SELECT * FROM car_trips";
        return new Promise((resolve, reject) => db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {
                resolve(JSON.stringify(results));
            }, function (tx, error) {
                reject(error);
            });
        }))
    }

    static getChosen(id) {
        var query = `SELECT * FROM car_trips WHERE (id = ${id})`;
        return new Promise((resolve, reject) => db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {
                resolve(JSON.stringify(results));
            }, function (tx, error) {
                reject(error);
            });
        }))
    }

    static update(id, date, km, usage, car, target, fuelprice) {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE car_trips SET date='${date}', kilometers=${km}, usage='${usage}', car='${car}', target='${target}', fuelprice='${fuelprice}' WHERE (id = ${id});`
            );
        })
    }

    static remove(id) {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM car_trips WHERE (id = ${id});`
            );
        });

    }

}



export default Database;

