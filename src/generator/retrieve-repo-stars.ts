import { StargazerGetResponseDto } from './models/stargazer-get-request.dto';
import * as Axios from 'axios';
import { config } from '../config';
import { RepoSummaryGetRequestDto } from './models/repo-summary-get-request.dto';
import promiseLimit from 'promise-limit';
import { ProgressTracker } from '../shared/progress-tracker';
import { delay } from './delay';

const limit = promiseLimit<StargazerGetResponseDto[]>(
    config.github.requestRateLimit,
);

export async function retrieveRepoStars(
    repo: string,
    token: string,
    progress: ProgressTracker,
): Promise<StargazerGetResponseDto[]> {
    const summary = await repoSummary(repo, token);
    const stars = summary.stargazers_count;
    const pages = Math.ceil(stars / config.github.stargazersPerPage);
    const requests = [];
    progress.reset();
    progress.setTotal(pages);
    for (let page = 1; page <= pages; page++) {
        requests.push(
            limit(() => retrieveRepoStarPage(repo, token, page, progress)),
        );
    }
    const results = await Promise.all(requests);
    return results.reduce((a, b) => a.concat(b), []);
}

async function repoSummary(
    repo: string,
    token: string,
): Promise<RepoSummaryGetRequestDto> {
    const headers = {
        Authorization: `token ${token}`,
    };
    const url = config.github.repoUrl(repo);
    const request = await Axios.default.get(url, { headers });
    return request.data;
}

async function retrieveRepoStarPage(
    repo: string,
    token: string,
    page: number,
    progress: ProgressTracker,
): Promise<StargazerGetResponseDto[]> {
    const maxRequests = config.maximumRepeatedRequests;
    for (let i = 0; i < maxRequests; i++) {
        try {
            const headers = {
                Authorization: `token ${token}`,
                Accept: config.github.stargazerContentType,
            };
            const url = `${config.github.stargazerUrl(repo)}?page=${page}`;
            const response = await Axios.default.get(url, { headers });
            progress.increase();
            return response.data;
        } catch (e) {
            console.error(
                `It looks like we hit an error, I'm retrying the request, so far I've run this request ${i} times. The error message was as follows: ${
                    e.message
                }.`,
            );
            await delay(config.repeatRequestDelay);
        }
    }
    throw new Error(
        `I've attempted the request ${
            config.maximumRepeatedRequests
        } times and it still failed. You'll have to try again later :/`,
    );
}
