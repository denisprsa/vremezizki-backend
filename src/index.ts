import { $log, ServerLoader } from "@tsed/common";
import { Server } from "./Server";
import { Server as WSServer } from 'ws'; 

async function bootstrap() {
    try {
        $log.debug("Start server...");
        const server = await ServerLoader.bootstrap(Server);

        await server.listen();

        const ws = new WSServer({
            server: server.httpServer
        });

        ws.on('connection', function connection(w) {
            w.on('message', function message(msg) {
                console.log(msg);
                w.send('jojjo')
            });
        });


        $log.debug("Server initialized");
    } catch (er) {
        $log.error(er);
    }
}

bootstrap();
