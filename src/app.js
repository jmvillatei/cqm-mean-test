const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

// conectando a BD
mongoose.connect('mongodb://localhost/crud-mongo')
    .then(function (db) { // <- db as first argument
        console.log('Base conectada')
    })
    .catch(function (err) {
        console.log('Error, BD no conectada')
    });

// importar routes
const indexRoutes = require('./routes/index');
// configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engien', 'ejs');

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', indexRoutes);


//servidor
app.listen(app.get('port'), function(){
    console.log('Servidor activo 2 '+ app.get('port'));
});

