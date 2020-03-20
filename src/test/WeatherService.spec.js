import { fail, deepEqual, rejects, equal } from 'assert';
import { stub, restore } from 'sinon';
import WeatherService from '../services/WeatherService';
import { ServiceError } from '../helpers/ServiceError';
import * as MockDate from 'mockdate';

const dependencies = {
    mySqlDatabase: {
        getWeatherStationRecords: stub()
    }
};
const weatherData = [{
    temperature: 12.4,
    dewpoint: 6.6,
    humidity: 68,
    windNormal: 14.2,
    windGusts: 23.4,
    windDirection: 288,
    pressure: 1003.4,
    rain: 0.1,
    datetime: '2020-01-01 00:00:00'
}];
const weatherService = new WeatherService(dependencies);

describe('Weather service', () => {
    before(() => {
        MockDate.set('01-01-2020');
    });

    after(() => {
        MockDate.reset();
    })

    beforeEach(() => {
        restore();
    });

    it('should throw if time difference larger than one week', async () => {
        dependencies.mySqlDatabase.getWeatherStationRecords.returns(Promise.resolve(['bla']));

        const dateFromISO = new Date().toISOString();
        const dateTo = new Date();
        dateTo.setDate(dateTo.getDate() + 7);
        dateTo.setMinutes(dateTo.getMinutes() + 1);
        const dateToISO = dateTo.toISOString();

        const testFunc = async () => await weatherService.getWeatherStationRecords(dateFromISO, dateToISO);
        rejects(testFunc,
            new ServiceError('Time difference cannot be larger than one week.', 400, 'differenceBetweenTimeTooLarge'));
    });

    it('should pass if time difference smaller or equal than one week', async () => {
        dependencies.mySqlDatabase.getWeatherStationRecords.returns(Promise.resolve(weatherData));

        const dateFromISO = new Date().toISOString();
        const dateTo = new Date();
        dateTo.setDate(dateTo.getDate() + 7);
        const dateToISO = dateTo.toISOString();

        const response = await weatherService.getWeatherStationRecords(dateFromISO, dateToISO);
        deepEqual(response, [{ ...weatherData[0], datetime: '2019-12-31T23:00:00.000Z' }]);
        equal(dependencies.mySqlDatabase.getWeatherStationRecords.calledWith('2020-01-01 00:00:00', '2020-01-08 00:00:00'), true);
    });
});
