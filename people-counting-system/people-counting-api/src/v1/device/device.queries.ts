import { type Query } from '../../interface';

export function getInsertDeviceQuery(name: string, locationId: number, active: boolean): Query {
  return {
    query: `
      INSERT INTO "device" ("name", "locationId", "active")
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
    replacements: [name, locationId, active]
  };
}

export function getAllDevicesQuery() {
  return {
    query: `
      SELECT
          "id"
        , "name"
        , "locationId"
        , "active"
        , "created"
        , "updated"
        , "deleted"
      FROM "device"
      WHERE "deleted" IS NULL;`,
    replacements: [],
  };
}

export function getDeviceByIdQuery(id: number): Query {  
  return {  
    query: `  
      SELECT  
          "id"  
        , "name"  
        , "locationId"  
        , "active"  
        , "created"  
        , "updated"  
        , "deleted"  
      FROM "device"  
      WHERE "id" = $1  
      AND "deleted" IS NULL;`,  
    replacements: [id],  
  };  
}  

export function getUpdateDeviceQuery(id: number, name: string, locationId: number, active: boolean) {
  return {
    query: `
      UPDATE "device"
      SET 
        "name" = $1,
        "locationId" = $2,
        "active" = $3
      WHERE "id" = $4 AND "deleted" IS NULL
      RETURNING *;
    `,
    replacements: [name, locationId, active, id]
  };
}

export function getDeleteDeviceQuery(id: number) {
  return {
    query: `
      UPDATE "device"
      SET "deleted" = NOW()
      WHERE "id" = $1 AND "deleted" IS NULL
      RETURNING *;
    `,
    replacements: [id]
  };
}
