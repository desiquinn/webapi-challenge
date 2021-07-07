const express = require('express');
const projectRouter = require('../projects/project-router.js');
const actionRouter = require('../actions/action-router.js');

const server = express();
server.use(express.json());


server.get('/', (req, res) => {
    res.status(200).json({api: 'Server Running!'})
});

// Project Router
server.use('/api/projects', projectRouter)
// Action Router
server.use('/api/projects', actionRouter)

//logger middleware


module.exports = server;