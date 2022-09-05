"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
// const config = require( './config.json' );
let app = new app_1.App();
app.expressApp.listen(Number(process.env.PORT) || 3000, "0.0.0.0", function () {
    console.log(`App listening at port ${3000}`);
});
