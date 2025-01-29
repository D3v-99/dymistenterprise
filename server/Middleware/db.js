const Sybase = require('@soinlabs/sybase');

// Sybase configuration
const sybase = new Sybase({
    host: '192.168.50.112',
    port: 5000,
    database: 'SVUPHSIQDBPR',
    username: 'gdi',
    password: 'jaslfmda@103#',
    encoding: 'utf8',
    // logTiming: true,
    // logs: true,
  });

  // Async function to connect to the Sybase database
const connectToDatabase = async () => {
    try {
      await sybase.connect();
      console.log('Connected to Sybase database.');
    } catch (err) {
      console.error('Failed to connect to Sybase database:', err);
      throw err;
    }
  };



module.exports = { sybase,connectToDatabase };