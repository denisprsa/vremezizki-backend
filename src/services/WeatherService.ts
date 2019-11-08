import DependencyService from './DependencyService';
import { WeatherStationData } from '../interfaces/WeatherStationData';

export default class WeatherService {
    constructor(private dependencies: DependencyService) {

    }

    public async createWeatherStationRecord(data: WeatherStationData): Promise<void> {
        await this.dependencies.mySqlDatabase.createWeatherStationRecord(data);
        this.dependencies.webSocketService.sendDataToAllClients(data);
    }

}