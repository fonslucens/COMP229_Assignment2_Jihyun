import config from './config/config.js';
import mongoose from 'mongoose';

// Fail without revealing secrets; .env is intentionally not included in the ZIP.
if (!config.jwtSecret || config.jwtSecret.length < 32 || config.jwtSecret.includes('REPLACE_')) {
  console.error('Set a private JWT_SECRET in .env. First run: npm run setup');
  process.exit(1);
}
if (!config.mongoUri || config.mongoUri.includes('YOUR_')) {
  console.error('Replace MONGODB_URI in the root .env with your own Atlas connection string.');
  process.exit(1);
}
if (!Number.isInteger(config.port) || config.port < 1 || config.port > 65535) {
  console.error('PORT must be an integer from 1 to 65535.');
  process.exit(1);
}

let httpServer;
try {
  // dbName explicitly selects Assignment 2's database, not the earlier Skeleton DB.
  await mongoose.connect(config.mongoUri, { dbName: 'Portfolio', serverSelectionTimeoutMS: 10000 });
  const { default: app } = await import('./server/express.js');
  // Create the four collections/indexes without inserting personal or fake records.
  for (const name of ['Contact', 'Project', 'Qualification', 'User']) {
    await mongoose.model(name).init();
  }
  console.log('Connected to the database: Portfolio');
  httpServer = app.listen(config.port, config.host, () => {
    console.log('Server started on port ' + config.port + '.');
    console.log('Local backend: http://localhost:' + config.port + '/');
  });
  httpServer.on('error', (err) => {
    console.error(err.code === 'EADDRINUSE' ? 'Port is already in use. Stop the other server.' : 'HTTP server failed to start.');
    process.exit(1);
  });
} catch (err) {
  console.error('Startup failed (' + (err.name || 'Error') + '). Check the DB user, password, IP access list and URI in .env.');
  await mongoose.disconnect();
  process.exit(1);
}

const shutdown = async () => {
  if (httpServer) httpServer.close();
  await mongoose.disconnect();
  process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
