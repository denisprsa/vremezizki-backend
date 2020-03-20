import {Controller, Res, Next, Post, BodyParams, Get, QueryParams, Required} from '@tsed/common';
import * as Express from 'express';
import { Description, Summary, Returns, Name, ReturnsArray } from '@tsed/swagger';
import DependencyService from './../services/DependencyService';
import { WeatherStationDataModel } from '../swagger-models/WeatherStationDataModel';
import { WeatherStationData } from '../interfaces/WeatherStationData';

@Name('Weather station')
@Controller('/')
export class WeatherController {

    constructor(private dependencies: DependencyService) {}
    
    @Post('/weather-station/measurements')
    @Description('Add weather station measurement data.')
    @Summary('Add weather station measurement data.')
    @Returns(200, { description: 'Success' })
    async addWeatherStationData(
        @Res() response: Express.Response,
        @Next() next: Express.NextFunction,
        @BodyParams({ useType: WeatherStationDataModel }) body: WeatherStationData
    ): Promise<void> {
        try {
            await this.dependencies.weatherService.createWeatherStationRecord(body);
            response.end();
        } catch (e) {
            throw e;
        }
    }

    @Get('/weather-station/measurements')
    @Description('Returns weather station measurements.')
    @Summary('Returns weather station measurements.')
    @ReturnsArray(200, { description: 'Success', type: WeatherStationDataModel })
    async getWeatherStationData(
        @Res() response: Express.Response,
        @Next() next: Express.NextFunction,
        @Required() @QueryParams('from') from: string,
        @Required() @QueryParams('to') to: string
    ): Promise<void> {

        let data = await this.dependencies.weatherService.getWeatherStationRecords(from, to);
        response.set('Access-Control-Allow-Origin', '*');
        response.json(data);
    }
}
