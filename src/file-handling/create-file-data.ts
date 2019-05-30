import { AllRepoStatistics } from '../generator/models/all-repo-statistics';
import { findMinDate } from './find-min-date';
import { findMaxDate } from './find-max-date';
import { normaliseDates } from './normalise-dates';
import { mappingToCumlative } from '../generator/mapping-to-cumulative';
import { FileData } from './models/file-data';

export function createFileDate(allRepoStatistics: AllRepoStatistics): FileData {
    const minDate = findMinDate(allRepoStatistics);
    const maxDate = findMaxDate(allRepoStatistics);

    const fileData: FileData = {};
    for (const repo in allRepoStatistics) {
        if (allRepoStatistics.hasOwnProperty(repo)) {
            const normalisedCounts = normaliseDates(
                allRepoStatistics[repo],
                minDate,
                maxDate,
            );
            fileData[repo] = {
                stars: normalisedCounts,
                cumulative: mappingToCumlative(normalisedCounts),
            };
        }
    }
    return fileData;
}
