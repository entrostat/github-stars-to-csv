import { AllRepoStatistics } from '../generator/models/all-repo-statistics';
import moment from 'moment';

export function findMaxDate(
    allRepoStatistics: AllRepoStatistics,
): moment.Moment {
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
