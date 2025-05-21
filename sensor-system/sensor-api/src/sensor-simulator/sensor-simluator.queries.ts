import { type Query } from '../interface';

export const getGetActiveSensorsQuery = (): Query => {
  return {
    query: `
      SELECT
        "id"
        ,"name"
        ,"firmwareVersion"
        ,"mountHeight"
        ,"businessStartTime"
        ,"businessEndTime"
        ,"dataPushEndpoint"
      FROM sensor
      WHERE "deleted" IS NULL;
    `,
    replacements: [],
  };
};
