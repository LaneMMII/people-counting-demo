import { type Query } from '../../interface';

export const getAllSampleQuery = (): Query => {
  return {
    query: `
      SELECT
        "id"
        ,"name"
      FROM sample
      WHERE "deleted" IS NULL;
    `,
    replacements: [],
  };
};

export const getSampleQueryById = (id: number): Query => {
  return {
    query: `
      SELECT
        "id"
        ,"name"
      FROM sample
      WHERE "deleted" IS NULL
        AND "id" = $1;
    `,
    replacements: [id],
  };
};
