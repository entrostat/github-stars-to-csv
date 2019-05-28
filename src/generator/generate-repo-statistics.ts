import { ProgressTracker } from '../shared/progress-tracker';
import { retrieveRepoStars } from './retrieve-repo-stars';
import { mapRepoStars } from './map-repo-stars';

export async function generateRepoStatistics(
    repo: string,
    token: string,
    progress: ProgressTracker,
) {
    const repoStars = await retrieveRepoStars(repo, token, progress);
    const starMapping = mapRepoStars(repoStars);
}
