const express = require('express');
const routes = require('./src/routes/routes');
const config = require('./src/config/config');
const expressValidator = require('express-validator')
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
app.use('/', routes);
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// let express to use this
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

