export interface SingleStargazer {
    starredAt: string;
    cursor: string;
}

export interface StargazerGetResponseDto {
    data: {
        repository: {
            stargazers: {
                edges: SingleStargazer[];
                totalCount: number;
                pageInfo: {
                    endCursor: string;
                    hasNextPage: boolean;
                };
            };
        };
    };
}
