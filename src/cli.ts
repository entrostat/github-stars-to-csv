#!/usr/bin/env node
import * as Yargs from 'yargs';
import { retrieveRepoStars } from './generator/retrieve-repo-stars';
import { mapRepoStars } from './generator/map-repo-stars';
import { ProgressTracker } from './shared/progress-tracker';
import { generateRepoStatistics } from './generator/generate-repo-statistics';
import * as ora from 'ora';
import { AllRepoStatistics } from './file-handling/all-repo-statistics';

async function run() {
    const incomingArguments: any = Yargs.scriptName('github-stars-to-csv')
        .usage('$0 [args]')
        .option('r', {
            alias: 'repo',
            demandOption: true,
            description: "A repo that you'd like to collect stats for",
        })
        .option('t', {
            alias: 'token',
            demandOption: true,
            description: 'Your GitHub developer token',
        })
        .showHelpOnFail(true)
        .help().argv;

    const progress = new ProgressTracker({
        onChange: () => console.log(progress.progress()),
    });

    const repos = Array.isArray(incomingArguments.repo)
        ? incomingArguments.repo
        : [incomingArguments.repo];
    const token = incomingArguments.token;

    const repoStatistics: AllRepoStatistics = {};
    for (const repo of repos) {
        const spinner = ora.default(`Generating ${repo} stats`).start();
        progress.onChange = () => {
            spinner.text = `Generating ${repo} stats: ${progress.progress()}%`;
        };
        repoStatistics[repo] = await generateRepoStatistics(
            repo,
            token,
            progress,
        );
        spinner.succeed(`Generating ${repo} stats`);
    }
}

run()
    .then(done => done)
    .catch(error => console.error(error));
