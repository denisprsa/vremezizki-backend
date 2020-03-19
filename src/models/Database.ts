import { createConnection, Connection, Query } from 'mysql';
import { readFileSync } from 'fs';
import { join } from 'path';
import { WeatherStationData } from '../interfaces/WeatherStationData';
import { resolve } from 'dns';

export default class MySqlDatabase {
    private connection: Connection;

    public async initialize(): Promise<void> {
        let configRaw = readFileSync(join(__dirname, '..', '..', 'config', 'connections.json'), 'utf8');
        let config = JSON.parse(configRaw);

        this.connection = createConnection({
            host: 'localhost',
            user: config.mySQLConnection.user,
            password: config.mySQLConnection.password,
            database: config.mySQLConnection.database
        });

        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    createWeatherStationRecord(data: WeatherStationData): Promise<void> {
        const sql = 'INSERT INTO podatkii SET ?';
        const sqlData = {
            TEMPERATURA: data.temperature,
            ROSISCE: data.dewpoint,
            VLAGA: data.humidity,
            VETERN: data.windNormal,
            VETERSU: data.windGusts,
            VETERSM: data.windDirection,
            TLAK: data.pressure,
            PADAVINE: data.rain,
            DATUM: data.datetime
        };

        return new Promise((resolve, reject) => {
            this.connection.query(sql, sqlData, (err, result) => {
                if (err) {
                    return reject(err);
                }

                resolve();
            });
        });
    }

    getWeatherStationRecords(from: string, to: string): Promise<any> {
        const sql = 'SELECT * FROM podatkii WHERE DATUM > ? AND DATUM < ?';
        const values = [from, to];

        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (err, result) => {
                if (err) {
                    return reject(err);
                }

                resolve(result);
            });
        });
    }
}
