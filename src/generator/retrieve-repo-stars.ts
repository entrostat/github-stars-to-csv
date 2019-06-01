import {
    SingleStargazer,
    StargazerGetResponseDto,
} from './models/stargazer-get-request.dto';
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
): Promise<SingleStargazer[]> {
    const summary = await retrieveRepoStarPage(repo, token, null, progress);
    const stars = summary.data.repository.stargazers.totalCount;
    const pages = Math.ceil(stars / config.github.graphqlMaximumRecordsPerPage);
    const requests: SingleStargazer[][] = [];
    progress.reset();
    progress.setTotal(pages);
    let nextPage = true;
    let cursor: string | null = null;
    while (nextPage) {
        const stargazers: StargazerGetResponseDto = await retrieveRepoStarPage(
            repo,
            token,
            cursor,
            progress,
        );
        cursor = stargazers.data.repository.stargazers.pageInfo.endCursor;
        nextPage = stargazers.data.repository.stargazers.pageInfo.hasNextPage;
        requests.push(stargazers.data.repository.stargazers.edges);
    }
    return requests.reduce((a, b) => a.concat(b), []);
}

async function retrieveRepoStarPage(
    repo: string,
    token: string,
    cursor: string | null,
    progress: ProgressTracker,
): Promise<StargazerGetResponseDto> {
    const maxRequests = config.maximumRepeatedRequests;
    for (let i = 0; i < maxRequests; i++) {
        try {
            const headers = {
                Authorization: `token ${token}`,
                Accept: config.github.stargazerContentType,
            };
            const url = config.github.graphqlUrl;
            const response = await Axios.default.post(
                url,
                {
                    query: generateQuery(repo, cursor),
                },
                { headers },
            );
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

function generateQuery(repo: string, cursor: string | null = null): string {
    const matches = /(.+)\/(.+)/.exec(repo);
    if (!matches) {
        throw new Error(
            `The repo you've specified (${repo}) cannot be broken into the owner and repo name...`,
        );
    }

    let cursorInfo = '';
    if (cursor) {
        cursorInfo = `, after: "${cursor}"`;
    }
    return `
        query { 
            repository(owner: "${matches[1]}", name: "${matches[2]}") { 
                stargazers(first: ${
                    config.github.graphqlMaximumRecordsPerPage
                }${cursorInfo}) { 
                    edges { 
                        starredAt 
                        cursor 
                    } 
                    totalCount 
                    pageInfo { 
                        endCursor
                        hasNextPage
                    }
                }
            }
        }
    `;
}
