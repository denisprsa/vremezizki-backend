import DependencyService from './DependencyService';
import moment from 'moment';
import { WeatherStationData } from '../interfaces/WeatherStationData';

export default class WeatherService {
    constructor(private dependencies: DependencyService) {

    }

    public async createWeatherStationRecord(data: WeatherStationData): Promise<void> {
        this.dependencies.validatorService.validateWeatherStationData(data);
        await this.dependencies.mySqlDatabase.createWeatherStationRecord(data);
        this.dependencies.webSocketService.sendDataToAllClients(data);
    }

    public async getWeatherStationRecords(from: string, to: string): Promise<any> {
        const formattedFrom = moment(from).format('YYYY-MM-DD HH:mm:ss');
        const formattedTo = moment(to).format('YYYY-MM-DD HH:mm:ss');
        const data = this.dependencies.mySqlDatabase.getWeatherStationRecords(formattedFrom, formattedTo);

        return data;
    }
}