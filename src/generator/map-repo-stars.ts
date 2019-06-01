import { SingleStargazer } from './models/stargazer-get-request.dto';
import moment from 'moment';
import { DateCount } from './models/date-count';
import { sortObjectKeys } from './sort-object-keys';

export function mapRepoStars(repoStars: SingleStargazer[]): DateCount {
    const unorderedResult: DateCount = {};
    repoStars.forEach(repoStar => {
        const dateString = moment(repoStar.starredAt).format('YYYY-MM-DD');
        unorderedResult[dateString] = (unorderedResult[dateString] || 0) + 1;
    });
    const orderedResult: DateCount = sortObjectKeys(unorderedResult);

    const orderedKeys = Object.keys(orderedResult).filter(key =>
        orderedResult.hasOwnProperty(key),
    );
    const firstDate = orderedKeys[0];
    const lastDate = orderedKeys[orderedKeys.length - 1];

    const current = moment(firstDate);
    const endDate = moment(lastDate);
    while (current.isBefore(endDate)) {
        const dateString = current.format('YYYY-MM-DD');
        orderedResult[dateString] = orderedResult[dateString] || 0;
        current.add(1, 'day');
    }

    return orderedResult;
}
