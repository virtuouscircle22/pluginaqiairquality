import express from 'express';

const app = express() 
const path = require('path')
const morgan = require('morgan')

// Importing Routes
const indexRoutes = require('./routes/index')


//Settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Midlewares
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.static(__dirname + "/public"));
// Routes
app.use('/', indexRoutes)

//Iniciando Servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})


export default app