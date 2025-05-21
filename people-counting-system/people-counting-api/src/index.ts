import { startServer } from './app';

(async () => {
  try {
    startServer();
  } catch (error) {
    console.error('Error starting the server:', error);
  }
})();
