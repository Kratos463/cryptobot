const dotenv = require('dotenv');
const { connectDB } = require('./database/db.config');
const { app } = require('./app');

dotenv.config();


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8001, () => {
            console.log("Server is running at port", process.env.PORT);
        });

    })
    .catch((err) => {
        console.log("MongoDB connection failed", err);
    });
