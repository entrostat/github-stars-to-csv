import { StargazerGetResponseDto } from './stargazer-get-response.dto';
import * as Axios from 'axios';
import { config } from '../config';

export async function retrieveRepoStars(
    repo: string,
    token: string,
): Promise<StargazerGetResponseDto[]> {
    console.log(await retrieveRepoStarPage(repo, token));
    return [];
}

async function retrieveRepoStarPage(
    repo: string,
    token: string,
    page: number = 1,
): Promise<StargazerGetResponseDto[]> {
    const headers = {
        Authorization: `token ${token}`,
        Accept: config.github.stargazerContentType,
    };
    const url = `${config.github.stargazerUrl}?page=${page}`;
    const response = await Axios.default.get(url, { headers });
    return response.data;
}
