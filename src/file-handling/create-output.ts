import { AllRepoStatistics } from '../generator/models/all-repo-statistics';
import { promisify } from 'util';
import * as fs from 'fs';
import moment from 'moment';
import { DateCount } from '../generator/models/date-count';
import { mappingToCumlative } from '../generator/mapping-to-cumulative';
import { sortObjectKeys } from '../generator/sort-object-keys';

const writeFile = promisify(fs.writeFile);

interface FileData {
    [repoName: string]: {
        stars: DateCount;
        cumulative: DateCount;
    };
}

export async function createOutput(
    filename: string,
    allRepoStatistics: AllRepoStatistics,
) {
    const minDate = findMinDate(allRepoStatistics);
    const maxDate = findMaxDate(allRepoStatistics);

    const fileData: FileData = {};
    for (const repo in allRepoStatistics) {
        if (allRepoStatistics.hasOwnProperty(repo)) {
            const normalisedCounts = normalise(
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

    const lines: string[][] = [[]];
    const allRepos = Object.keys(fileData).filter(key =>
        fileData.hasOwnProperty(key),
    );

    lines[0].push('date');
    allRepos.forEach(repo => {
        lines[0].push(`${repo} stars`);
        lines[0].push(`${repo} cumulative`);
    });
    const firstKey = allRepos[0];
    const dates = Object.keys(fileData[firstKey].stars);

    for (const date of dates) {
        const line: string[] = [];
        line.push(date);
        allRepos.forEach(repo => {
            try {
                line.push(fileData[repo].stars[date].toString());
                line.push(fileData[repo].cumulative[date].toString());
            } catch (e) {
                console.log(fileData[repo].stars, date);
                throw e;
            }
        });
        lines.push(line);
    }

    const csv = lines.map(line => line.join(',')).join('\n');
    await writeFile(filename, csv);
}

function findMinDate(allRepoStatistics: AllRepoStatistics): moment.Moment {
    // @ts-ignore
    let min: moment.Moment = null;
    for (const repo in allRepoStatistics) {
        if (allRepoStatistics.hasOwnProperty(repo)) {
            const repoStatistic = allRepoStatistics[repo];
            const keys = Object.keys(repoStatistic);
            keys.map(key => moment(key)).forEach(date => {
                if (min === null || date.isSameOrBefore(min)) {
                    min = date;
                }
            });
        }
    }
    return min;
}

function findMaxDate(allRepoStatistics: AllRepoStatistics): moment.Moment {
    // @ts-ignore
    let max: moment.Moment = null;
    for (const repo in allRepoStatistics) {
        if (allRepoStatistics.hasOwnProperty(repo)) {
            const repoStatistic = allRepoStatistics[repo];
            const keys = Object.keys(repoStatistic);
            keys.map(key => moment(key)).forEach(date => {
                if (max === null || date.isSameOrAfter(max)) {
                    max = date;
                }
            });
        }
    }
    return max;
}

function normalise(
    dateCounts: DateCount,
    minDate: moment.Moment,
    maxDate: moment.Moment,
) {
    const current = minDate.clone();
    while (current.isSameOrBefore(maxDate)) {
        const dateString = current.format('YYYY-MM-DD');
        dateCounts[dateString] = dateCounts[dateString] || 0;
        current.add(1, 'day');
    }
    return sortObjectKeys(dateCounts);
}
