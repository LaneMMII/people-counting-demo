export class Sensor {
  id: number;
  name: string;
  firmwareVersion: string;
  mountHeight: number;
  businessStartTime: Date;
  businessEndTime: Date;
  dataPushEndpoint: string;

  constructor(
    id: number,
    name: string,
    firmwareVersion: string,
    mountHeight: number,
    businessStartTime: Date,
    businessEndTime: Date,
    dataPushEndpoint: string,
  ) {
    this.id = id;
    this.name = name;
    this.firmwareVersion = firmwareVersion;
    this.mountHeight = mountHeight;
    this.businessStartTime = businessStartTime;
    this.businessEndTime = businessEndTime;
    this.dataPushEndpoint = dataPushEndpoint;
  }

  /**
   * Simulates the sensor pushing count packets every minute to the configured dataPushEndpoint.
   *
   * {
   *   "sensorId": 1,
   *   "timestamp": "2023-10-01T00:00:00Z",
   *   "in": 10,
   *   "out": 5
   * }
   *
   * Outside of business hours, the in and out counts are always 0.
   */
  startSimulation() {
    setInterval(() => {
      const now = new Date();
      const businessStart = new Date(this.businessStartTime);
      const businessEnd = new Date(this.businessEndTime);

      if (now >= businessStart && now <= businessEnd) {
        const inCount = Math.floor(Math.random() * 16);
        const outCount = Math.floor(Math.random() * 16);

        const packet = {
          sensorId: this.id,
          timestamp: now.toISOString(),
          in: inCount,
          out: outCount,
        };

        this.pushData(packet);
      } else {
        const packet = {
          sensorId: this.id,
          timestamp: now.toISOString(),
          in: 0,
          out: 0,
        };

        this.pushData(packet);
      }
    }, 60 * 1000);
  }

  async pushData(packet: any) {
    console.log(`Pushing data to ${this.dataPushEndpoint}:`, packet);
    //   try {
    //     const response = await fetch(this.dataPushEndpoint, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(packet),
    //     });

    //     if (!response.ok) {
    //       throw new Error(`Network response was not ok: ${response.statusText}`);
    //     }

    //     const data = await response.json();
    //     console.log('Data pushed successfully:', data);
    //   } catch (error) {
    //     console.error('Error pushing data:', error);
    //   }
    //   console.log(`Pushing data to ${this.dataPushEndpoint}:`, packet);
  }
}
