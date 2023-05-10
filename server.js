const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

app.use(cors());
app.use(express.json({ extended: true }));
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

// Routes
app.use(`${baseURL}/post`, require('./routes/post.route'));

// Initialize Next.js
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });

nextApp.prepare().then(() => {
  // Add Next.js routes
  app.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    nextApp.render(req, res, pathname, query);
  });

  // Create server
  const server = createServer(app);

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
