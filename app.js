const express = require('express');
const sequelize = require('./src/db/db');
const routes = require('./src/routes/index');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const IP_ADDRESS = '127.0.0.1';
sequelize.authenticate()
    .then(() => {
        return sequelize.sync();
    })
    .then(() => {
        console.log('Database synced');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};


const options = {
    swaggerDefinition: {
        info: {
            title: 'API',
            version: '1.0.0',
            description: 'API для Коли',
        },
    },
    apis: ['./src/routes/*.js']
};
const specs = swaggerJsdoc(options);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/uploads', express.static('uploads'));
app.use(cors(corsOptions));
app.use(express.json());

routes(app)

app.listen(PORT, IP_ADDRESS,() => {
    console.log(`Server running on ${PORT}`);
});