const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars')
const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.engine('.hbs', expressHbs.engine({ extname: "hbs", defaultLayout: 'main', layoutsDir: "views/layouts/" }));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.json());


// const userRouter = require('./routes/userRoutes')
const baitapRoutes = require('./routes/baitapRoutes')

const userController = require('./controllers/userController')


//conect mongodb
const dbConect = require('./connect')
dbConect.connect();

// app.use(userRouter)
app.use(baitapRoutes)

app.use('/user', userController)


// app.get('/', async(req, res) => {
//   let result = await mongoose.connect(url);
//   console.log(result);
//   res.send("Ket noi db thanh cong")
// })

app.listen(port, () => {
  console.log("Localhost lang nghe cong " + port)
});

