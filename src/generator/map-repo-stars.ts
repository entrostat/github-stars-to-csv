import { StargazerGetResponseDto } from './stargazer-get-request.dto';
import moment from 'moment';
import { DateCount } from './date-count';

export function mapRepoStars(repoStars: StargazerGetResponseDto[]): DateCount {
    const unorderedResult: DateCount = {};
    repoStars.forEach(repoStar => {
        const dateString = moment(repoStar.starred_at).format('YYYY-MM-DD');
        unorderedResult[dateString] = (unorderedResult[dateString] || 0) + 1;
    });
    const orderedResult: DateCount = {};
    Object.keys(unorderedResult).sort((a, b) => {
        const aDate = moment(a);
        const bDate = moment(b);
        if (aDate.isSame(bDate)) {
            return 0;
        }
        return aDate.isBefore(bDate) ? -1 : 1;
    });
    return orderedResult;
}
