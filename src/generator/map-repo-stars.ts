import { StargazerGetResponseDto } from './stargazer-get-request.dto';
import moment from 'moment';

interface DateCount {
    [date: string]: number;
}

export function mapRepoStars(repoStars: StargazerGetResponseDto[]): DateCount {
    const result: DateCount = {};
    repoStars.forEach(repoStar => {
        const dateString = moment(repoStar.starred_at).format('YYYY-MM-DD');
        result[dateString] = (result[dateString] || 0) + 1;
    });
    return result;
}
