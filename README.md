# Github Stars to CSV
A GitHub star aggregation library for graphs. Just get a GitHub personal access token from your account settings page and run the cli to generate a `.csv` file with a timeline of the stars for one or more repo.

# Output
When you run this function, it returns a table of a timeline of the star count for each repository you select. The output looks as follows,

| date       | repoA stars | repoA cumulative | repoB stars | repoB cumulative |
|------------|-------------|------------------|-------------|------------------|
| 2019-01-01 | 1           | 1                | 0           | 0                |
| 2019-01-02 | 2           | 3                | 0           | 0                |
| 2019-01-03 | 0           | 3                | 0           | 0                |
| 2019-01-04 | 0           | 3                | 1           | 1                |
| 2019-01-05 | 3           | 6                | 0           | 1                |
| 2019-01-06 | 2           | 8                | 1           | 2                |
| 2019-01-07 | 2           | 10               | 2           | 4                |

# Usage
In order to use this package, you'll need to generate a GitHub personal access token. To do this, follow the steps below,

 1. Go to your account settings
 2. Click on the "Developer Settings" option (on the left sidebar close to the bottom)
 3. Select the "Personal access tokens" option
 4. Click the "Generate new token" button and authenticate (if GitHub asks)
 5. Add a note so that you know what it's for (I just used "github-stars")
 6. Don't select any scopes, just scroll to the bottom and click "Generate token"
 7. Copy that token and store it somewhere so that you can use it here when needed

## install

To install this package run,

```bash
npm install -g github-stars-to-csv
```

Now generate a `.csv` file using the command,
```bash
github-stars-to-csv --repo=repo/repo1 --repo=repo/repo2 --token=YOUR_GITHUB_PERSONAL_ACCESS_TOKEN
```

You can also generate it for a single repo,
```bash
github-stars-to-csv --repo=repo/repo1 --token=YOUR_GITHUB_PERSONAL_ACCESS_TOKEN
```


## npx
You can run this without installing the package using the following command:

```bash
npx github-stars-to-csv --repo=repo/repo1 --repo=repo/repo2 --token=YOUR_GITHUB_PERSONAL_ACCESS_TOKEN
```

# Thanks
A special thanks to [Dominik Kundel](https://github.com/dkundel) for his article on [How to build a CLI with Node.js](https://www.twilio.com/blog/how-to-build-a-cli-with-node-js).
