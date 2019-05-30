import { ProgressTracker } from '../shared/progress-tracker';
import { retrieveRepoStars } from './retrieve-repo-stars';
import { mapRepoStars } from './map-repo-stars';
import { DateCount } from './models/date-count';

export async function generateRepoStatistics(
    repo: string,
    token: string,
    progress: ProgressTracker,
): Promise<DateCount> {
    const repoStars = await retrieveRepoStars(repo, token, progress);
    return mapRepoStars(repoStars);
}
