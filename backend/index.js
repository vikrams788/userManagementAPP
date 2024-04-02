require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: "https://user-management-app-892j.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use('/api', userRoutes);
app.use('/api', teamRoutes);

db.connect();

app.listen(3000, () => {
    console.log(`Server started`);
});