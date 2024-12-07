const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser'); // Removido
const consultasRoutes = require('./routes/consultasRoutes');

const app = express();
const port = 3000;

const BASE_PATH = __dirname;
const PUBLIC_PATH = path.join(BASE_PATH, 'public');
const VIEWS_PATH = path.join(BASE_PATH, 'views');



// Configuração do view engine e pasta de views
app.set('view engine', 'ejs');
app.set('views', VIEWS_PATH);

// Middleware de logging
app.use((req, res, next) => {console.log(`Requisição recebida: ${req.method} ${req.url}`); next();});
// Middleware para lidar com JSON no body da requisição
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// API routes should come before HTML routes
app.use('/api/consultas', consultasRoutes);

// HTML routes
app.get('/consultas', (req, res) => {res.render('consultasView'); });

// Servir arquivos estáticos da pasta public em /chupaleads
app.use('/chupaleads', express.static(PUBLIC_PATH));

// Error handling for API routes
app.use('/api', (err, req, res, next) => {console.error(err.stack); res.status(500).json({ error: 'Erro interno do servidor' });});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {console.error(err.stack); res.status(500).json({ error: 'Erro interno do servidor' });});

// Inicia o servidor
app.listen(port, () => {console.log(`Servidor rodando em http://localhost:${port}`);});