import DependencyService from './DependencyService';
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
        const data = this.dependencies.mySqlDatabase.getWeatherStationRecords(from, to);

        return data;
    }
}