import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from '@tsed/common';
import "@tsed/swagger"; 
import WebSocket, { Server as WSServer } from 'ws'; 

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import * as Path from 'path';
import DependencyService from './services/DependencyService';

const rootDir: string = Path.resolve(__dirname);
const dependencyService: DependencyService = DependencyService.createInstance();

@ServerSettings({
    mount: {
        '/': `${rootDir}/controllers/*.ts`
    },
    componentsScan: [
        `${rootDir}/services/**/**.ts`,
        `${rootDir}/middlewares/**/**.ts`
    ],
    swagger: [
        {
            path: "/api-docs"
        }
    ],
    httpPort: process.env.PORT || 4000,
    httpsPort: false,
    rootDir,
    acceptMimes: ['application/json']
})
export class Server extends ServerLoader {

    /**
     * This method let you configure the express middleware required by your application to works.
     *
     */
    public async $beforeRoutesInit(): Promise<any> {
        await dependencyService.mySqlDatabase.initialize();

        this
        .use(GlobalAcceptMimesMiddleware)
        .use(cookieParser())
        .use(compress({}))
        .use(methodOverride())
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({
            extended: true
        }));
    }

    /**
     * This function is fired when server is up and running
     *
     */
    public $onReady(): void | Promise<any> {
        const wss = new WSServer({
            server: this.httpServer
        });

        wss.on('connection',  (ws: WebSocket) => {
            let id = Math.random().toString();
            dependencyService.connectedWebSockets.set(id, ws);

            ws.on('close', () => {
                dependencyService.connectedWebSockets.delete(id);
            });
        });
    }
}
