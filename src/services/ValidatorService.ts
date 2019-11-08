import { WeatherStationData } from 'src/interfaces/WeatherStationData';
import moment from 'moment';

export default class ValidatorService {
    public validateWeatherStationData(data: WeatherStationData): void {
        if (moment(data.datetime, 'YYYY-MM-DD HH:mm:ss', true).isValid() === false) {
            throw new Error('Invalid date time format.');
        }
    }
}
