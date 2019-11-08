import {Controller, Get, Req, Res, Next, Post, BodyParams} from '@tsed/common';
import * as Express from 'express';
import { Description, Summary, Returns, Name } from '@tsed/swagger';
import DependencyService from './../services/DependencyService';
import { WeatherStationDataPayloadModel } from '../swagger-models/WeatherStationDataPayloadModel';
import { WeatherStationData } from '../interfaces/WeatherStationData';

@Name('Weather station')
@Controller('/')
export class WeatherController {

    constructor(private dependencies: DependencyService) {}
    
    @Post('/weather-station')
    @Description('Returns weather data.')
    @Summary('Returns weather data.')
    @Returns(200, { description: 'Success' })
    async getWeatherData(
        @Req() request: Express.Request,
        @Res() response: Express.Response,
        @Next() next: Express.NextFunction,
        @BodyParams({ useType: WeatherStationDataPayloadModel }) body: WeatherStationData
    ): Promise<void> {
        await this.dependencies.weatherService.createWeatherStationRecord(body);
    }
}
