const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
//yarn nodemon index.js
//yarn dev
const app = express();

mongoose.connect('mongodb+srv://laudair:laudair@cluster0-odsva.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});
app.use(cors());
//express entender json
app.use(express.json());
// Métodos HTTP get,  post, put , delete
//Tipos de parametros

//Query Params: request.query (Filtros, ordenação, paginaçao)
//Route Params: request.params(indentificar recurso ou remover)
//Body: request.body(dados para criaçao )

//MongoDB (BANCO NAO RELACIONAL)
// yarn add mongoose
app.use(routes);

app.listen(3000);