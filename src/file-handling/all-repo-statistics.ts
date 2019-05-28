import { DateCount } from '../generator/date-count';

export interface AllRepoStatistics {
    [repoName: string]: DateCount;
}
