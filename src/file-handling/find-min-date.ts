import { AllRepoStatistics } from '../generator/models/all-repo-statistics';
import moment from 'moment';

export function findMinDate(
    allRepoStatistics: AllRepoStatistics,
): moment.Moment {
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
