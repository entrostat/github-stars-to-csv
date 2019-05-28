import { DateCount } from './date-count';

export function mappingToCumlative(dateCounts: DateCount): DateCount {
    const result: DateCount = {};
    const keys = Object.keys(dateCounts);

    const firstKey = keys[0];
    result[firstKey] = dateCounts[firstKey];

    for (let i = 1; i < keys.length; i++) {
        const currentKey = keys[i];
        const prevKey = keys[i - 1];
        result[currentKey] = result[prevKey] + dateCounts[currentKey];
    }

    return result;
}
