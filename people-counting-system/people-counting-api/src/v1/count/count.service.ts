import { executeQuery } from '../../db';
import { getAllSampleQuery, getSampleQueryById } from './count.queries';

export const getAllSample = async () => {
  const { query, replacements } = getAllSampleQuery();

  const result = await executeQuery(query, replacements);

  return result;
};

export const getSampleById = async (id: number) => {
  const { query, replacements } = getSampleQueryById(id);

  const result = await executeQuery(query, replacements);

  return result;
};
