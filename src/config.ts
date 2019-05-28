export const config = {
    github: {
        repoUrl: (repo: string) => `https://api.github.com/repos/${repo}`,
        stargazerUrl: (repo: string) =>
            `${config.github.repoUrl(repo)}/stargazers`,
        stargazerContentType: 'application/vnd.github.v3.star+json',
        stargazersPerPage: 30,
        requestRateLimit: 10,
    },
};
