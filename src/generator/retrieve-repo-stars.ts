import { StargazerGetResponseDto } from './stargazer-get-response.dto';

export async function retrieveRepoStars(
    repo: string,
    token: string,
): Promise<StargazerGetResponseDto[]> {
    return [];
}
