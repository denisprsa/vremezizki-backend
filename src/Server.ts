import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from '@tsed/common';
import "@tsed/swagger"; 

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import * as Path from 'path';

const rootDir: string = Path.resolve(__dirname);

@ServerSettings({
    mount: {
        '/': `${rootDir}/controllers/*.ts`
    },
    componentsScan: [
        `${rootDir}/services/**/**.ts`,
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
     * @returns {Server}
     */
    public $beforeRoutesInit(): void | Promise<any> {
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


}
