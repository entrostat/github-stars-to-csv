import { ProgressTracker } from '../shared/progress-tracker';
import { retrieveRepoStars } from './retrieve-repo-stars';
import { mapRepoStars } from './map-repo-stars';
import { mappingToCumlative } from './mapping-to-cumulative';
import { RepoStatistics } from './repo-statistics';

export async function generateRepoStatistics(
    repo: string,
    token: string,
    progress: ProgressTracker,
): Promise<RepoStatistics> {
    const repoStars = await retrieveRepoStars(repo, token, progress);
    const stars = mapRepoStars(repoStars);
    const cumulative = mappingToCumlative(stars);
    return { stars, cumulative };
}
