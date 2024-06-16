import { Server } from "http";
import app from "./app";
import config from "./app/config";

let server : Server;

const bootstrap = async() => {
    app.listen(config.port, () => {
        console.log(`Server running on port: ${config.port}`);
    })
}

bootstrap();