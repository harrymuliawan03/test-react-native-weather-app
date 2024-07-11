import {ForecastItem} from '../models/foreCastItem';

export const filterDuplicates = (data: ForecastItem[]): ForecastItem[] => {
  const uniqueDates = data.reduce<ForecastItem[]>((acc, current) => {
    const date = current.dt_txt.split(' ')[0]; // Extract date part
    if (!acc.some(item => item.dt_txt.split(' ')[0] === date)) {
      acc.push(current);
    }
    return acc;
  }, []);
  return uniqueDates;
};
