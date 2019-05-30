import { DateCount } from './date-count';

export interface AllRepoStatistics {
    [repoName: string]: DateCount;
}
