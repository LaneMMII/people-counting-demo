export class Sensor {
  id: number;
  name: string;
  firmwareVersion: string;
  mountHeight: number;
  businessStartTime: Date;
  businessEndTime: Date;
  dataPushEndpoint: string;
  handleBusinessHours: boolean = true;

  constructor(
    id: number,
    name: string,
    firmwareVersion: string,
    mountHeight: number,
    businessStartTime: Date,
    businessEndTime: Date,
    dataPushEndpoint: string,
    handleBusinessHours?: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.firmwareVersion = firmwareVersion;
    this.mountHeight = mountHeight;
    this.businessStartTime = businessStartTime;
    this.businessEndTime = businessEndTime;
    this.dataPushEndpoint = dataPushEndpoint;
    this.handleBusinessHours = handleBusinessHours ?? true;
  }

  start() {
    // uncomment the following line to simulate the sensor immediately
    // setTimeout(() => {
    //   this.simulateSensor();
    // }, 10000); // 10 seconds delay before the first data push
    setInterval(() => {
      this.simulateSensor();
    }, 60000); // 1 minute interval
  }

  /**
   * Simulates the sensor pushing count packets every minute to the configured dataPushEndpoint.
   *
   * {
   *   "sensorId": 1,
   *   "name": "Sensor 1",
   *   "timestamp": "2023-10-01T00:00:00Z",
   *   "in": 10,
   *   "out": 5
   * }
   *
   * Outside of business hours, the in and out counts are always 0.
   */
  simulateSensor() {
    const now = new Date();
    const businessStart = new Date(this.businessStartTime);
    const businessEnd = new Date(this.businessEndTime);
    const inCount = Math.floor(Math.random() * 16);
    const outCount = Math.floor(Math.random() * 16);

    if (
      !this.handleBusinessHours ||
      (this.handleBusinessHours && now >= businessStart && now <= businessEnd)
    ) {
      this.pushData({
        deviceId: this.id,
        name: this.name,
        timestamp: now.toISOString(),
        in: inCount,
        out: outCount,
      });
    } else {
      this.pushData({
        deviceId: this.id,
        name: this.name,
        timestamp: now.toISOString(),
        in: 0,
        out: 0,
      });
    }
  }

  async pushData(packet: any) {
    console.log(`Pushing data to ${this.dataPushEndpoint}:`, packet);
    try {
      const response = await fetch(this.dataPushEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(packet),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Data pushed successfully:', data);
    } catch (error) {
      console.error('Error pushing data:', error);
    }
  }
}
