import { WebSocketResponseTypes } from '../enum/WebSocketResponseTypes';

export interface WebSocketResponse<T> {
    payload: T;
    type: WebSocketResponseTypes;
}