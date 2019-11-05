import {Controller, Get, Req, Res, Next} from '@tsed/common';
import * as Express from 'express';
import { Description, Summary } from '@tsed/swagger';
import DependencyService from './../services/DependencyService';

@Controller('/')
export class Weather {

    constructor(private dependecies: DependencyService) {}
    
    @Get('/weather')
    @Description('Returns weather data.')
    @Summary('Returns weather data.')
    getWeatherData(
        @Req() request: Express.Request,
        @Res() response: Express.Response,
        @Next() next: Express.NextFunction
    ): void {
        response.json({
            done: true
        });
    }
}
