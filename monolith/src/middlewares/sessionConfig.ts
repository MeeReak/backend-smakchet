import { SessionOptions } from 'express-session';

const sessionConfig: SessionOptions = {
  secret: 'your_strong_secret_key', // Replace with a strong, unique secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true for production in HTTPS environments
};

export default sessionConfig;