import { type Location } from '../../interface';
import { type Query } from '../../interface';

export function getInsertLocationQuery(name: string, address: string): Query {
  return {
    query: `
      INSERT INTO "location" ("name", "address")
      VALUES ($1, $2)
      RETURNING *;
    `,
    replacements: [name, address]
  };
}
export function getAllLocationsQuery(): Query {
  return {
    query: `
      SELECT
          "id"
        , "name"
        , "address"
        , "created"
        , "updated"
        , "deleted"
      FROM "location"
      WHERE "deleted" IS NULL;`,
    replacements: [],
  };
}

export function getLocationByIdQuery(id: number): Query {  
  return {  
    query: `  
      SELECT  
          "id"  
        , "name"  
        , "address"  
        , "created"  
        , "updated"  
        , "deleted"  
      FROM "location"  
      WHERE "id" = $1  
      AND "deleted" IS NULL;`,  
    replacements: [id],  
  };  
}  

export function getUpdateLocationQuery(  
  id: number,  
  name: string,  
  address: string,  
): Query {  
  return {  
    query: `  
      UPDATE "location"  
      SET  
          "name" = $1  
        , "address" = $2  
        , "updated" = NOW()  
      WHERE "id" = $3  
      AND "deleted" IS NULL  
      RETURNING *;  
    `,  
    replacements: [name, address, id],  
  };  
}  

export function getDeleteLocationQuery(id: number): Query {  
  return {  
    query: `  
      UPDATE "location"  
      SET "deleted" = NOW()  
      WHERE "id" = $1  
      AND "deleted" IS NULL  
      RETURNING *;  
    `,  
    replacements: [id],  
  };  
}  