import { WeatherStationData } from 'src/interfaces/WeatherStationData';
import moment from 'moment';
import { BadRequest } from 'ts-httpexceptions';

export default class ValidatorService {
    public validateWeatherStationData(data: WeatherStationData): void {
        if (moment(data.datetime, 'YYYY-MM-DD HH:mm:ss', true).isValid() === false) {
            throw new BadRequest('Invalid date time format. Should be "YYYY-MM-DD HH:mm:ss".');
        }
    }
}
