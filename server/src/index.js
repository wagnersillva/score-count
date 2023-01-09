const { app } = require("./ServerConfig");

const port = app.get('port');

app.listen(port, () => {
    console.log('Server running in ' + port)
})