import { Sensor } from './sensor.class';
import { getActiveSensors } from './sensor-simulator.service';

export const simulateSensors = async () => {
  const sensors = await getActiveSensors();

  const sensorInstances = sensors.map((sensor) => {
    return new Sensor(
      sensor.id,
      sensor.name,
      sensor.firmwareVersion,
      sensor.mountHeight,
      sensor.businessStartTime,
      sensor.businessEndTime,
      sensor.dataPushEndpoint,
    );
  });

  sensorInstances.forEach((sensor) => {
    sensor.startSimulation();
  });
};
