import { Service } from '@tsed/common';
import WebSocket = require('ws');
import MySqlDatabase from '../models/Database';
import WeatherService from './WeatherService';
import WebSocketService from './WebSocketService';
import ValidatorService from './ValidatorService';


@Service()
export default class DependencyService {
    private static instance: DependencyService;
    public connectedWebSockets: Map<string, WebSocket>;
    public mySqlDatabase: MySqlDatabase;
    public weatherService: WeatherService;
    public webSocketService: WebSocketService;
    public validatorService: ValidatorService;

    private constructor() {
        if (DependencyService.instance) {
            this.connectedWebSockets = DependencyService.instance.connectedWebSockets;
            this.mySqlDatabase = DependencyService.instance.mySqlDatabase;
            this.weatherService = DependencyService.instance.weatherService;
            this.webSocketService = DependencyService.instance.webSocketService;
            this.validatorService = DependencyService.instance.validatorService;
        } else {
            this.connectedWebSockets = new Map();
            this.mySqlDatabase = new MySqlDatabase();
            this.weatherService = new WeatherService(this);
            this.webSocketService = new WebSocketService(this);
            this.validatorService = new ValidatorService();

            DependencyService.instance = this;
        }
    }

    static createInstance(): DependencyService {
        if (!this.instance) {
            this.instance = new DependencyService();
        }

        return this.instance;
    }

    static get(): DependencyService {
        return this.instance;
    }
}
