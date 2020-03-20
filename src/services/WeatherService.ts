import DependencyService from './DependencyService';
import moment from 'moment';
import { WeatherStationData } from '../interfaces/WeatherStationData';
import { ServiceError } from '../helpers/ServiceError';

export default class WeatherService {
    constructor(private dependencies: DependencyService) {

    }

    public async createWeatherStationRecord(data: WeatherStationData): Promise<void> {
        this.dependencies.validatorService.validateWeatherStationData(data);
        await this.dependencies.mySqlDatabase.createWeatherStationRecord(data);
        this.dependencies.webSocketService.sendDataToAllClients(data);
    }

    public async getWeatherStationRecords(from: string, to: string): Promise<any> {
        const dateFrom = moment(from);
        const dateTo = moment(to);
        const formattedFrom = dateFrom.format('YYYY-MM-DD HH:mm:ss');
        const formattedTo = dateTo.format('YYYY-MM-DD HH:mm:ss');
        const timeDifference = dateTo.unix() - dateFrom.unix();
        const oneWeekInSeconds = 604800;

        if (timeDifference > oneWeekInSeconds) {
            throw new ServiceError('Time difference cannot be larger than one week.', 400, 'differenceBetweenTimeTooLarge');
        }

        const measurements = await this.dependencies.mySqlDatabase.getWeatherStationRecords(formattedFrom, formattedTo);

        return measurements.map((value: WeatherStationData) => {
            return {
                ...value,
                datetime: new Date(value.datetime).toISOString()
            };
        })
    }
}