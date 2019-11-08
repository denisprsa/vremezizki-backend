import DependencyService from './DependencyService';
import { WebSocketResponseTypes } from '../enum/WebSocketResponseTypes';
import { WebSocketResponse } from '../interfaces/WebSocketResponse';
import { WeatherStationData } from '../interfaces/WeatherStationData';


export default class WebSocketService {
    constructor(private dependencies: DependencyService) { }

    public sendDataToAllClients(data: WeatherStationData): void {
        for (let key of this.dependencies.connectedWebSockets.keys()) {
            let ws = this.dependencies.connectedWebSockets.get(key);

            if (ws) {
                ws.send(JSON.stringify(data));
            }
        }
    }

    public structureWsResponse<T>(type: WebSocketResponseTypes, payload: T): WebSocketResponse<T> {
        return  {
            type: type,
            payload: payload
        };
    } 
}