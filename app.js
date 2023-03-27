const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const userRouter = require('./routes/userRoutes')
const baitapRoutes = require('./routes/baitapRoutes')
const app = express();
app.use(express.json());

//conect mongodb
const dbConect = require('./connect')
dbConect.connect();

app.use(userRouter)
app.use(baitapRoutes)

app.listen(port, () => {
  console.log("Localhost lang nghe cong " + port)
});

