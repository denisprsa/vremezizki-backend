import { WeatherStationData } from '../interfaces/WeatherStationData';
import { Required, Property } from '@tsed/common';


export class WeatherStationDataPayloadModel implements WeatherStationData {
    @Required()
    @Property()
    public temperature: number;
    @Required()
    @Property()
    public dewpoint: number;
    @Required()
    @Property()
    public humidity: number;
    @Required()
    @Property()
    public windNormal: number;
    @Required()
    @Property()
    public windGusts: number;
    @Required()
    @Property()
    public windDirection: number;
    @Required()
    @Property()
    public pressure: number;
    @Required()
    @Property()
    public rain: number;
    @Required()
    @Property()
    public datetime: string;
}