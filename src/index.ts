import { App } from './App';
const config = require( './config.json' );

let app = new App();
app.expressApp.listen(config.port, config.host, function() {
    console.log(`App listening at port ${config.port}`);
});