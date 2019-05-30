import { DateCount } from '../../generator/models/date-count';

export interface FileData {
    [repoName: string]: {
        stars: DateCount;
        cumulative: DateCount;
    };
}
