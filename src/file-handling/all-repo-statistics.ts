import { RepoStatistics } from '../generator/repo-statistics';

export interface AllRepoStatistics {
    [repoName: string]: RepoStatistics;
}
