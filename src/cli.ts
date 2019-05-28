#!/usr/bin/env node
import * as Yargs from 'yargs';
import { retrieveRepoStars } from './generator/retrieve-repo-stars';
import { mapRepoStars } from './generator/map-repo-stars';
import { ProgressTracker } from './shared/progress-tracker';
import { generateRepoStatistics } from './generator/generate-repo-statistics';

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
    const test = await generateRepoStatistics(
        incomingArguments.repo,
        incomingArguments.token,
        progress,
    );
    console.log(test);
}

run()
    .then(done => done)
    .catch(error => console.error(error));
