import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import contactRoutes from './routes/contact.routes.js';
import projectRoutes from './routes/project.routes.js';
import qualificationRoutes from './routes/qualification.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
// Register parsers/security middleware BEFORE routes (course ordering correction).
app.use(bodyParser.json({ limit: '100kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], credentials: true }));

app.get('/', (req, res) => res.json({ message: 'Welcome to My Portfolio application.' }));
app.use('/', contactRoutes);
app.use('/', projectRoutes);
app.use('/', qualificationRoutes);
app.use('/', userRoutes);
app.use('/', authRoutes);

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') return res.status(401).json({ error: 'A valid Bearer token is required' });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON request body' });
  if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Request body is too large' });
  // Do not log connection strings, passwords or raw request bodies.
  console.error('Request failed:', err.name || 'Error');
  return res.status(500).json({ error: 'Server error' });
});

export default app;
