export const config = {
    github: {
        repoUrl: (repo: string) => `https://api.github.com/repos/${repo}`,
        stargazerUrl: (repo: string) =>
            `${config.github.repoUrl(repo)}/stargazers`,
        stargazerContentType: 'application/vnd.github.v3.star+json',
        stargazersPerPage: 30,
        requestRateLimit: 10,
        graphqlUrl: `https://api.github.com/graphql`,
        graphqlMaximumRecordsPerPage: 100,
    },
    maximumRepeatedRequests: 100,
    repeatRequestDelay: 1000,
};
