const express = require('express');
const sequelize = require('./src/db/db');
const routes = require('./src/routes/index');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;
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

app.use(cors(corsOptions));
app.use(express.json());

routes(app)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
