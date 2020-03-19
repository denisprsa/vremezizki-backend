import ValidatorService from '../services/ValidatorService';
import { fail, deepEqual } from 'assert';
import { BadRequest } from 'ts-httpexceptions';

const validatorService = new ValidatorService();
const payload = {
    temperature: 1,
    dewpoint: 1,
    humidity: 34,
    windDirection: 1,
    windGusts: 1,
    windNormal: 1,
    rain: 1,
    pressure: 1230,
    datetime: 'invalid date'
};

describe('Validator service', () => {
    it('should throw error if invalid date format provided', () => {
        try {
            validatorService.validateWeatherStationData(payload);
            fail('Should not pass');
        } catch (e) {
            deepEqual(e, new BadRequest('Invalid date time format. Should be "YYYY-MM-DD HH:mm:ss".'));
        }
    });

    it('should pass if valid date format provided', () => {
        payload.datetime = '2018-01-01 23:34:03';
        validatorService.validateWeatherStationData(payload);
    });
});
