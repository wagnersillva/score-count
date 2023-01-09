const config = require('./config');

const { middlewares, settings, routes, app } = config;

middlewares.forEach( middleware => app.use(middleware));
settings.forEach( setting => app.set(setting.key, setting.value));

app.use(routes);



module.exports = { app, routes }