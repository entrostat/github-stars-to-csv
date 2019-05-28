# Github Stars to CSV
A GitHub star aggregation library for graphs and stuff.

# Usage

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
