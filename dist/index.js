"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const config = require('./config.json');
let app = new App_1.App();
app.expressApp.listen(config.port, config.host, function () {
    console.log(`App listening at port ${config.port}`);
});
