const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const jwt = require("jsonwebtoken");

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

const baseURL = '/api/v1/zombie';

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to MongoDB'));

app.prepare().then(() => {
  const server = express();

  server.use(cors({allowedHeaders: ['Authorization']}));
  server.use(express.json({ extended: true }));

  // Middleware para manejo de tokens y usuarios
  server.use(function(req, res, next) {
    //console.log(req.headers)
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (err) {
        req.user = undefined;
        next();
      }
    } else {
      req.user = undefined;
      next();
    }
  });

  // Routes
  server.use(`${baseURL}/post`, require('./routes/post.route'));
  server.use(`${baseURL}/auth`, require("./routes/user.route"));
  server.use(`${baseURL}/point`, require('./routes/point.route'));


  // Ruta por defecto para Next.js
  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    handle(req, res, pathname, query);
  });

  //create server
  const httpServer = createServer(server);

  httpServer.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${PORT}`);
  });

}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
