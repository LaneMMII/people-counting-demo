import { startServer } from './app';
import { simulateSensors } from './sensor-simulator/simulator';

(async () => {
  try {
    await simulateSensors();
    startServer();
  } catch (error) {
    console.error('Error starting the server:', error);
  }
})();
